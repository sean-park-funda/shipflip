-- Enum types
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'both'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'active', 'under_offer', 'sold', 'rejected', 'archived'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE revenue_model AS ENUM ('saas', 'marketplace', 'freemium', 'api', 'one_time', 'ads', 'membership', 'lead_gen'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE transaction_status AS ENUM ('offer_sent', 'offer_accepted', 'deposit_paid', 'verification_in_progress', 'verification_passed', 'verification_failed', 'full_payment', 'transfer_in_progress', 'completed', 'cancelled', 'refunded', 'disputed'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE message_type AS ENUM ('text', 'offer', 'counter_offer', 'system'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE dispute_status AS ENUM ('filed', 'evidence_collection', 'under_review', 'resolved', 'appealed'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE transfer_step_status AS ENUM ('pending', 'in_progress', 'completed', 'failed'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role user_role DEFAULT 'buyer',
  website TEXT,
  github_username TEXT,
  is_admin BOOLEAN DEFAULT false,
  stripe_account_id TEXT,
  stripe_onboarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Listings
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  revenue_model_type revenue_model,
  tech_stack TEXT[] DEFAULT '{}',
  monthly_revenue NUMERIC(10,2) DEFAULT 0,
  monthly_users INTEGER DEFAULT 0,
  asking_price NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  demo_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  status listing_status DEFAULT 'draft',
  verification_badge BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector TSVECTOR
);

-- Wishlists
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  offer_amount NUMERIC(10,2),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status transaction_status DEFAULT 'offer_sent',
  agreed_price NUMERIC(10,2) NOT NULL,
  deposit_amount NUMERIC(10,2),
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  verification_report JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Transaction Secrets (encrypted, service role only)
CREATE TABLE IF NOT EXISTS transaction_secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  secret_type TEXT NOT NULL,
  encrypted_value TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  destroyed_at TIMESTAMPTZ
);

-- Transfer Steps
CREATE TABLE IF NOT EXISTS transfer_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  status transfer_step_status DEFAULT 'pending',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disputes
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  filed_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  evidence JSONB,
  status dispute_status DEFAULT 'filed',
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listings_seller ON listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_search ON listings USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_transactions_listing ON transactions(listing_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);

-- FTS trigger
CREATE OR REPLACE FUNCTION listings_search_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.title, '') || ' ' ||
    coalesce(NEW.description, '') || ' ' ||
    coalesce(NEW.short_description, '') || ' ' ||
    coalesce(array_to_string(NEW.tech_stack, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS listings_search_trigger ON listings;
CREATE TRIGGER listings_search_trigger
  BEFORE INSERT OR UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION listings_search_update();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS listings_updated_at ON listings;
CREATE TRIGGER listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS transactions_updated_at ON transactions;
CREATE TRIGGER transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, own write
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Listings: active public, own manage
DROP POLICY IF EXISTS "Active listings are viewable by everyone" ON listings;
CREATE POLICY "Active listings are viewable by everyone" ON listings FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
DROP POLICY IF EXISTS "Sellers can create listings" ON listings;
CREATE POLICY "Sellers can create listings" ON listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
DROP POLICY IF EXISTS "Sellers can update own listings" ON listings;
CREATE POLICY "Sellers can update own listings" ON listings FOR UPDATE USING (auth.uid() = seller_id);
DROP POLICY IF EXISTS "Sellers can delete own listings" ON listings;
CREATE POLICY "Sellers can delete own listings" ON listings FOR DELETE USING (auth.uid() = seller_id);

-- Wishlists: own only
DROP POLICY IF EXISTS "Users can view own wishlists" ON wishlists;
CREATE POLICY "Users can view own wishlists" ON wishlists FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own wishlists" ON wishlists;
CREATE POLICY "Users can manage own wishlists" ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own wishlists" ON wishlists;
CREATE POLICY "Users can delete own wishlists" ON wishlists FOR DELETE USING (auth.uid() = user_id);

-- Conversations: participants only
DROP POLICY IF EXISTS "Participants can view conversations" ON conversations;
CREATE POLICY "Participants can view conversations" ON conversations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
DROP POLICY IF EXISTS "Buyers can create conversations" ON conversations;
CREATE POLICY "Buyers can create conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Messages: participants only
DROP POLICY IF EXISTS "Participants can view messages" ON messages;
CREATE POLICY "Participants can view messages" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM conversations c WHERE c.id = conversation_id AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid()))
);
DROP POLICY IF EXISTS "Participants can send messages" ON messages;
CREATE POLICY "Participants can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
DROP POLICY IF EXISTS "Recipients can mark messages read" ON messages;
CREATE POLICY "Recipients can mark messages read" ON messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM conversations c WHERE c.id = conversation_id AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid()))
);

-- Transactions: participants only
DROP POLICY IF EXISTS "Participants can view transactions" ON transactions;
CREATE POLICY "Participants can view transactions" ON transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
DROP POLICY IF EXISTS "Buyers can create transactions" ON transactions;
CREATE POLICY "Buyers can create transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = buyer_id);
DROP POLICY IF EXISTS "Participants can update transactions" ON transactions;
CREATE POLICY "Participants can update transactions" ON transactions FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Transaction Secrets: NO client access
DROP POLICY IF EXISTS "No client access to secrets" ON transaction_secrets;
CREATE POLICY "No client access to secrets" ON transaction_secrets FOR ALL USING (false);

-- Transfer Steps: participants only
DROP POLICY IF EXISTS "Participants can view transfer steps" ON transfer_steps;
CREATE POLICY "Participants can view transfer steps" ON transfer_steps FOR SELECT USING (
  EXISTS (SELECT 1 FROM transactions t WHERE t.id = transaction_id AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid()))
);

-- Disputes: participants only
DROP POLICY IF EXISTS "Participants can view disputes" ON disputes;
CREATE POLICY "Participants can view disputes" ON disputes FOR SELECT USING (
  EXISTS (SELECT 1 FROM transactions t WHERE t.id = transaction_id AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid()))
);
DROP POLICY IF EXISTS "Participants can file disputes" ON disputes;
CREATE POLICY "Participants can file disputes" ON disputes FOR INSERT WITH CHECK (auth.uid() = filed_by);

-- Reviews: public read, own write
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create reviews" ON reviews;
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
