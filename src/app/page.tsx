import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  );
}

function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );
}

const mockListings = [
  {
    title: "AI 요약 뉴스레터 SaaS",
    tech: ["Next.js", "OpenAI", "Supabase"],
    price: "₩500,000",
    users: "Early Adopter 23명",
    description: "GPT 기반 뉴스 자동 요약 & 발송 서비스. Stripe 결제 연동 완료.",
  },
  {
    title: "반려동물 건강 트래커",
    tech: ["React Native", "Firebase"],
    price: "₩300,000",
    users: "MAU 150명",
    description: "반려동물 식단/건강 기록 앱. 앱스토어 출시 완료, 리뷰 4.5점.",
  },
  {
    title: "프리랜서 인보이스 자동화",
    tech: ["Svelte", "Supabase", "Resend"],
    price: "₩800,000",
    users: "가입자 67명",
    description: "인보이스 생성/발송/추적 올인원. PDF 자동생성, 이메일 알림.",
  },
];

const steps = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "빌드",
    description: "바이브코딩으로 MVP를 빠르게 만듭니다",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "리스팅",
    description: "기술 스택, 사용자 수, 수익 등을 등록합니다",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "매칭",
    description: "운영/사업화에 강한 바이어를 만납니다",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "거래",
    description: "안전한 에스크로로 소유권을 이전합니다",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              SF
            </div>
            <span className="text-lg font-bold tracking-tight">ShipFlip</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#how" className="hover:text-foreground transition-colors">
              이용방법
            </a>
            <a href="#listings" className="hover:text-foreground transition-colors">
              둘러보기
            </a>
            <a href="#for-who" className="hover:text-foreground transition-colors">
              셀러 / 바이어
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
            <Button size="sm">시작하기</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-36">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              바이브코딩 시대의 새로운 마켓플레이스
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              개발자는{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                0→1
              </span>
              <br />
              운영자는{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                1→100
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              빠르게 만들었지만 운영이 힘든 개발자.
              <br />
              개발은 못하지만 운영/사업화를 잘하는 사람.
              <br />
              <span className="text-foreground font-medium">
                ShipFlip이 둘을 연결합니다.
              </span>
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 px-8 text-base">
                MVP 등록하기
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base">
                매물 둘러보기
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              수수료 0% &middot; 에스크로 보호 &middot; 소유권 이전 지원
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              어떻게 작동하나요?
            </h2>
            <p className="mt-3 text-muted-foreground">
              4단계로 MVP의 새 주인을 찾아줍니다
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={i} className="group relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {step.icon}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-5 hidden h-5 w-5 text-muted-foreground/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                최신 매물
              </h2>
              <p className="mt-3 text-muted-foreground">
                바이브코딩으로 만들어진 검증된 MVP들
              </p>
            </div>
            <Button variant="ghost" className="hidden gap-1 md:flex">
              전체보기 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {mockListings.map((listing, i) => (
              <Card
                key={i}
                className="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <span className="text-lg font-bold text-primary">
                      {listing.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {listing.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {listing.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{listing.users}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers & Buyers */}
      <section id="for-who" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Sellers */}
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">셀러 (개발자)</h3>
                <p className="mt-2 text-muted-foreground">
                  만드는 건 좋아하지만, 운영은 지치셨나요?
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "주말 프로젝트를 수익으로 전환",
                    "다음 아이디어에 집중할 시간 확보",
                    "포트폴리오 + 실제 거래 이력",
                    "수수료 0% — 받는 금액이 곧 수익",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full gap-2" variant="outline">
                  MVP 등록하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Buyers */}
            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">바이어 (운영자)</h3>
                <p className="mt-2 text-muted-foreground">
                  좋은 아이디어를 직접 키워보고 싶으신가요?
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "검증된 MVP로 사업 시작 — 개발 기간 0일",
                    "기술 스택 & 코드 품질 사전 검증",
                    "기존 사용자 베이스 인수",
                    "에스크로로 안전한 거래 보장",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full gap-2" variant="outline">
                  매물 둘러보기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/40 p-10 text-center md:p-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              다음 히트 서비스의 씨앗,
              <br />
              지금 ShipFlip에서 찾으세요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              매주 새로운 MVP가 올라옵니다.
              <br />
              얼리 액세스에 등록하고 가장 먼저 알림을 받으세요.
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button size="lg" className="shrink-0 px-8">
                얼리 액세스 신청
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              스팸 없음 &middot; 언제든 구독 취소 가능
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
                SF
              </div>
              <span className="font-semibold">ShipFlip</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 ShipFlip. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
