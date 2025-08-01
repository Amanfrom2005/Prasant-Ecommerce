import { Button } from "../components/ui/button";
import { ArrowRight, Mail, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <main className="mt-10">
      <section className="overflow-hidden bg-[#fcf8f2] dark:bg-[#18181b]">
        <div className="relative mx-auto max-w-7xl mt-20 px-6 py-24 md:py-28 lg:py-20 rounded-3xl">
          <div className="lg:flex lg:items-center lg:gap-8 xl:gap-16">
            {/* ================= LEFT TEXT COLUMN ================= */}
            <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <Link
                to="/"
                className="rounded-lg mx-auto flex w-fit items-center gap-2 border border-[#ede8d0] bg-white/70 hover:bg-emerald-50 transition shadow pr-3 lg:ml-0"
              >
                <span className="bg-[#ede8d0] rounded-md px-2 py-1 text-xs tracking-wide font-semibold text-[#232323]">
                  New
                </span>
                <span className="text-[#4f4f4f] text-sm">
                  Introduction Tailark Html
                </span>
                <span className="block h-4 w-px bg-[#ede8d0]" />
                <ArrowRight className="size-4 text-emerald-600" />
              </Link>

              <h1 className="mt-10 text-balance text-4xl leading-tight font-bold text-[#18181b] md:text-5xl xl:text-5xl dark:text-white">
                Production Ready{" "}
                <span className="bg-emerald-100 rounded-lg px-2 py-1 text-emerald-700">
                  Digital Marketing
                </span>{" "}
                blocks
              </h1>
              <p className="mt-8 text-lg text-[#6b6b6b] dark:text-[#bdbdbd]">
                Best place to find your dream shoes. We offer a wide range offer
              </p>

              <div>
                <form className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto">
                  <div className="relative grid grid-cols-[1fr_auto] items-center rounded-xl border border-[#ede8d0] pr-1 shadow has-[input:focus]:ring-2 has-[input:focus]:ring-emerald-200 bg-white dark:bg-[#232323]">
                    <Mail
                      className="text-emerald-600 pointer-events-none absolute left-5 my-auto size-5"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    />

                    <input
                      placeholder="Your mail address"
                      className="h-14 w-full bg-transparent pl-12 text-[#232323] dark:text-white placeholder:text-[#979797] focus:outline-none"
                      type="email"
                    />

                    <div className="md:pr-1.5 lg:pr-0">
                      <Button
                        aria-label="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 transition text-white md:px-7"
                        type="submit"
                      >
                        <span className="hidden md:block">Get Started</span>
                        <SendHorizonal className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                      </Button>
                    </div>
                  </div>
                </form>
                <ul className="list-inside list-disc space-y-2 text-left text-[#626262] dark:text-[#aaaaaa] pl-2 font-medium text-[17px]">
                  <li>Faster</li>
                  <li>Modern</li>
                  <li>100% Customizable</li>
                </ul>
              </div>
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative pt-16 lg:pt-0 lg:w-1/2 flex items-center justify-center min-h-[340px]">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#ede8d0] relative">
                <img
                  className="hidden dark:block w-full h-auto object-cover"
                  src="https://tailark.com/_next/image?url=%2Fmusic.png&w=3840&q=75"
                  alt="app illustration"
                  width={600}
                  height={400}
                />
                <img
                  className="dark:hidden w-full h-auto object-cover"
                  src="https://tailark.com/_next/image?url=%2Fmusic-light.png&w=3840&q=75"
                  alt="app illustration"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
          {/* BG SHAPE (subtle) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-[#fbf7ed] to-[#f7f3e5] dark:from-[#232323] dark:to-[#34343c] opacity-85"
          />
        </div>
      </section>
    </main>
  );
}
