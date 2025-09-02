"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TerminalOutput } from "@/components/terminal-output"

export default function TerminalPortfolio() {
  const [history, setHistory] = useState<Array<{ command: string; output: React.JSX.Element }>>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const [bootStep, setBootStep] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isSwinging, setIsSwinging] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isTerminalExpanding, setIsTerminalExpanding] = useState(false)
  const [terminalHeight, setTerminalHeight] = useState(0)

  // ID Card Tilt Effect
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = ((y - centerY) / centerY) * 10
    const tiltY = ((x - centerX) / centerX) * 10

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleCardClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
  }

  // Boot sequence animation
  useEffect(() => {
    if (isBooting) {
      const bootMessages = ["Starting Portfolio Terminal...", "Loading user profile...", "System ready."]

      const timer = setTimeout(() => {
        if (bootStep < bootMessages.length - 1) {
          setBootStep(bootStep + 1)
        } else {
          setIsBooting(false)
          const welcomeOutput: React.JSX.Element = (
            <TerminalOutput>
              <div className="space-y-2">
                <div className="text-green-400 mt-4">🚀 Welcome to John Doe's Portfolio Terminal</div>
                <div className="text-gray-300">
                  Type <span className="text-yellow-400">'help'</span> to see available commands.
                </div>
              </div>
            </TerminalOutput>
          )
          setHistory([{ command: "", output: welcomeOutput }])
        }
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isBooting, bootStep])

  useEffect(() => {
    if (terminalRef.current) {
      const newHeight = terminalRef.current.scrollHeight
      const isExpanding = newHeight > terminalHeight
      if (isExpanding && terminalHeight > 0) {
        setIsTerminalExpanding(true)
        setTimeout(() => setIsTerminalExpanding(false), 800)
      }

      setTerminalHeight(newHeight)
      // Smooth scroll to bottom
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [history, terminalHeight])

  useEffect(() => {
    setIsLoaded(true)
    // Start swing animation after boot sequence
    if (!isBooting) {
      setIsSwinging(true)
      setTimeout(() => setIsSwinging(false), 3000) // Stop after 3 seconds
    }
  }, [isBooting])

  // Handle command history navigation
  const handleHistoryNavigation = (direction: "up" | "down") => {
    if (commandHistory.length === 0) return

    let newIndex = historyIndex
    if (direction === "up") {
      newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
    } else {
      newIndex = historyIndex > -1 ? historyIndex - 1 : -1
    }

    setHistoryIndex(newIndex)
    setCurrentCommand(newIndex === -1 ? "" : commandHistory[commandHistory.length - 1 - newIndex])
  }

  // Tab completion
  const handleTabCompletion = () => {
    const commands = [
      "help",
      "about",
      "skills",
      "projects",
      "certifications",
      "education",
      "website-links",
      "contact",
      "clear",
    ]
    const matches = commands.filter((cmd) => cmd.startsWith(currentCommand.toLowerCase()))
    if (matches.length === 1) {
      setCurrentCommand(matches[0])
    } else if (matches.length > 1) {
      const completionOutput: React.JSX.Element = (
        <TerminalOutput>
          <div className="text-yellow-400">Available completions: {matches.join(", ")}</div>
        </TerminalOutput>
      )
      setHistory((prev) => [...prev, { command: currentCommand, output: completionOutput }])
    }
  }

  const executeCommand = (command: string) => {
    setIsTerminalExpanding(true)
    setTimeout(() => setIsTerminalExpanding(false), 600)

    const cmd = command.toLowerCase().trim()
    // Add to command history
    if (cmd && !commandHistory.includes(cmd)) {
      setCommandHistory((prev) => [...prev, cmd])
    }
    setHistoryIndex(-1)

    let output: React.JSX.Element

    const getCommand = (input: string): string => {
      const directCommands = [
        "help",
        "about",
        "skills",
        "projects",
        "certifications",
        "website-links",
        "contact",
        "clear",
        "education",
      ]
      if (directCommands.includes(input)) return input

      const aliases: { [key: string]: string } = {
        projects: "projects",
        portfolio: "projects",
        work: "projects",
        code: "projects",
        certs: "certifications",
        certificates: "certifications",
        links: "website-links",
        social: "website-links",
        tech: "skills",
        technologies: "skills",
        bio: "about",
        info: "about",
        me: "about",
        reach: "contact",
        email: "contact",
        cls: "clear",
        clr: "clear",
        edu: "education",
      }

      return aliases[input] || input
    }

    const matchedCommand = getCommand(cmd)

    switch (matchedCommand) {
      case "help":
        output = (
          <TerminalOutput>
            <div className="space-y-1 text-gray-300">
              <div className="text-cyan-400 mb-2">📋 Available Commands:</div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-yellow-400">help</span> - Show this help message
                </div>
                <div>
                  <span className="text-yellow-400">about</span> - Learn about me
                </div>
                <div>
                  <span className="text-yellow-400">skills</span> - View technical skills
                </div>
                <div>
                  <span className="text-yellow-400">projects</span> - View code projects
                </div>
                <div>
                  <span className="text-yellow-400">certifications</span> - View certificates
                </div>
                <div>
                  <span className="text-yellow-400">education</span> - Educational background
                </div>
                <div>
                  <span className="text-yellow-400">website-links</span> - Coding profiles
                </div>
                <div>
                  <span className="text-yellow-400">contact</span> - Contact information
                </div>
                <div>
                  <span className="text-yellow-400">clear</span> - Clear terminal
                </div>
              </div>
              <div className="mt-3 text-gray-400 text-sm">
                💡 Tips: Use ↑↓ for command history, Tab for completion, natural language works too!
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "about":
        output = (
          <TerminalOutput>
            <div className="space-y-2 text-gray-300">
              <div className="text-cyan-400 mb-2">👨‍💻 About John Doe</div>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="shrink-0 lg:hidden">
                  <img
                    src="/software-developer-headshot.png"
                    alt="John Doe Profile"
                    className="w-24 h-24 rounded-lg border-2 border-cyan-400/50 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div>Full-Stack Developer with 5+ years of experience building modern web applications.</div>
                  <div>Passionate about clean code, user experience, and cutting-edge technologies.</div>
                  <div className="mt-2">
                    <div>📍 Location: San Francisco, CA</div>
                    <div>🎓 Education: Computer Science, Stanford University</div>
                    <div>💼 Currently: Senior Developer at TechCorp</div>
                    <div>🏆 Competitive Programmer | Problem Solver | Tech Enthusiast</div>
                  </div>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "skills":
        output = (
          <TerminalOutput>
            <div className="space-y-4 text-gray-300">
              <div className="text-cyan-400 mb-2">🛠️ Technical Skills</div>
              <div className="space-y-4">
                <div className="border border-gray-600 p-3 rounded">
                  <div className="text-yellow-400 mb-2">Frontend Development</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">React</span>
                    <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">Next.js</span>
                    <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-sm">Vue.js</span>
                    <span className="bg-orange-900 text-orange-200 px-2 py-1 rounded text-sm">TypeScript</span>
                    <span className="bg-yellow-900 text-yellow-200 px-2 py-1 rounded text-sm">JavaScript</span>
                    <span className="bg-cyan-900 text-cyan-200 px-2 py-1 rounded text-sm">Tailwind CSS</span>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <div className="text-yellow-400 mb-2">Backend Development</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-sm">Node.js</span>
                    <span className="bg-red-900 text-red-200 px-2 py-1 rounded text-sm">Express.js</span>
                    <span className="bg-purple-900 text-purple-200 px-2 py-1 rounded text-sm">Python</span>
                    <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">PostgreSQL</span>
                    <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-sm">MongoDB</span>
                    <span className="bg-red-900 text-red-200 px-2 py-1 rounded text-sm">Redis</span>
                  </div>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "projects":
        output = (
          <TerminalOutput>
            <div className="space-y-4 text-gray-300">
              <div className="text-cyan-400 mb-2">💻 Code Projects</div>
              <div className="space-y-4">
                <div className="border border-gray-600 p-3 rounded flex gap-3">
                  <img
                    src="/ecommerce-platform-screenshot.png"
                    alt="E-Commerce Platform"
                    className="w-16 h-16 rounded border border-gray-500 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-yellow-400">E-Commerce Platform</div>
                    <div className="text-sm text-gray-400">Next.js, Stripe, PostgreSQL</div>
                    <div className="mt-1">Full-featured online store with payment processing and admin dashboard.</div>
                    <div className="mt-2">
                      <a
                        href="https://ecommerce-demo.johndoe.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 underline hover:text-green-300"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded flex gap-3">
                  <img
                    src="/task-management-dashboard.png"
                    alt="Task Management App"
                    className="w-16 h-16 rounded border border-gray-500 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-yellow-400">Task Management App</div>
                    <div className="text-sm text-gray-400">React, Node.js, MongoDB</div>
                    <div className="mt-1">Collaborative project management tool with real-time updates.</div>
                    <div className="mt-2">
                      <a
                        href="https://tasks.johndoe.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 underline hover:text-green-300"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "certifications":
        output = (
          <TerminalOutput>
            <div className="space-y-2 text-gray-300">
              <div className="text-cyan-400 mb-2">🏆 Certifications & Achievements</div>
              <div className="space-y-4">
                <div className="border border-gray-600 p-3 rounded flex gap-3">
                  <img
                    src="/aws-certification-badge.png"
                    alt="AWS Certification"
                    className="w-12 h-12 rounded border border-gray-500 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-yellow-400">AWS Certified Solutions Architect (2023)</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Professional level cloud architecture certification
                    </div>
                    <a
                      href="https://aws.amazon.com/verification"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300 text-sm mt-2 inline-block"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded flex gap-3">
                  <img
                    src="/google-cloud-certification-badge.png"
                    alt="Google Cloud Certification"
                    className="w-12 h-12 rounded border border-gray-500 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-yellow-400">Google Cloud Professional Developer (2022)</div>
                    <div className="text-sm text-gray-400 mt-1">Professional cloud development and deployment</div>
                    <a
                      href="https://cloud.google.com/certification/verify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300 text-sm mt-2 inline-block"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "education":
        output = (
          <TerminalOutput>
            <div className="space-y-4 text-gray-300">
              <div className="text-cyan-400 mb-2">🎓 Educational Background</div>
              <div className="space-y-4">
                <div className="border border-gray-600 p-3 rounded flex gap-3">
                  <img
                    src="/stanford-university-logo.png"
                    alt="Stanford University"
                    className="w-12 h-12 rounded border border-gray-500 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-yellow-400">Stanford University</div>
                    <div className="text-sm text-gray-400">Bachelor of Science in Computer Science</div>
                    <div className="text-sm text-gray-400 mt-1">2016 - 2020 | GPA: 3.8/4.0</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Relevant Coursework: Data Structures, Algorithms, Web Development
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "website-links":
        output = (
          <TerminalOutput>
            <div className="space-y-2 text-gray-300">
              <div className="text-cyan-400 mb-2">🔗 Professional Profile Links</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <img src="/leetcode-logo.png" alt="LeetCode" className="w-4 h-4" />
                  <a
                    href="https://leetcode.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    LeetCode: leetcode.com/johndoe
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/hackerrank-logo.png" alt="HackerRank" className="w-4 h-4" />
                  <a
                    href="https://hackerrank.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    HackerRank: hackerrank.com/johndoe
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/github-logo.png" alt="GitHub" className="w-4 h-4" />
                  <a
                    href="https://github.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    GitHub: github.com/johndoe
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/linkedin-official-logo.png" alt="LinkedIn" className="w-4 h-4" />
                  <a
                    href="https://linkedin.com/in/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    LinkedIn: linkedin.com/in/johndoe
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/twitter-x-logo.png" alt="Twitter/X" className="w-4 h-4" />
                  <a
                    href="https://twitter.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Twitter/X: twitter.com/johndoe
                  </a>
                </div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "contact":
        output = (
          <TerminalOutput>
            <div className="space-y-2 text-gray-300">
              <div className="text-cyan-400 mb-2">📞 Contact Information</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <a href="mailto:john.doe@email.com" className="text-blue-400 underline hover:text-blue-300">
                    Email: john.doe@email.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <a href="tel:+15551234567" className="text-blue-400 underline hover:text-blue-300">
                    Phone: +1 (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <a
                    href="https://johndoe.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Website: johndoe.dev
                  </a>
                </div>
                <div className="mt-3 text-green-400">Feel free to reach out for collaborations or opportunities!</div>
              </div>
            </div>
          </TerminalOutput>
        )
        break

      case "clear":
        setHistory([])
        return

      case "":
        return

      default:
        output = (
          <TerminalOutput>
            <div className="text-red-400">
              '{command}' is not recognized as an internal or external command.
              <br />
              <div className="mt-1 text-gray-300">Type 'help' to see all available commands.</div>
            </div>
          </TerminalOutput>
        )
    }

    setHistory((prev) => [...prev, { command, output }])
  }

  // Show boot sequence
  if (isBooting) {
    const bootMessages = ["Starting Portfolio Terminal...", "Loading user profile...", "System ready."]

    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl text-cyan-400">⚡ BOOTING PORTFOLIO SYSTEM ⚡</div>
          <div className="space-y-2">
            {bootMessages.slice(0, bootStep + 1).map((message, index) => (
              <div key={index} className="text-green-400">
                {index === bootStep ? <span className="animate-pulse">{message}</span> : message}
              </div>
            ))}
          </div>
          <div className="text-yellow-400 animate-spin text-2xl">⟳</div>
        </div>
      </div>
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
      setCurrentCommand("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      handleHistoryNavigation("up")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      handleHistoryNavigation("down")
    } else if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <div className="flex min-h-screen">
        {/* Left Side - Hanging ID Card - Hidden on mobile */}
        <div className="w-1/4 hidden lg:flex items-center justify-center relative">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: 15 }, (_, index) => (
              <div
                key={index}
                className="absolute w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-lg transition-all duration-300 hover:scale-150 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-cyan-600 hover:shadow-cyan-400/50 cursor-pointer"
                style={{
                  top: `${index * 12}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  transformOrigin: "center center",
                  animation: isSwinging
                    ? `dottedWave 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`
                    : isTerminalExpanding
                      ? `dottedHover 0.8s ease-out ${index * 0.05}s`
                      : `dottedWave 4s ease-in-out infinite ${index * 0.2}s`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                }}
              />
            ))}
          </div>

          {/* ID Card */}
          <div
            ref={cardRef}
            className="relative mt-16 lg:mt-24 transition-all duration-700 ease-out cursor-pointer"
            style={{
              transform: isSwinging
                ? "perspective(1000px) translateZ(20px)"
                : isClicked
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(25px) scale(1.02)`
                  : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
              transformOrigin: "center top",
              animation: isSwinging
                ? "cardFalling 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : isClicked
                  ? "cardBounce 0.6s ease-out"
                  : isTerminalExpanding
                    ? "cardPulse 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "cardSway 4s ease-in-out infinite",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            <div className="w-48 h-56 lg:w-64 lg:h-72 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl border border-cyan-500/30 relative overflow-hidden transform-gpu hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400 rounded-br-2xl"></div>
              <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center">
                <div className="relative mb-3 group">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden border-4 border-cyan-400/50 shadow-lg shadow-cyan-500/25 transition-transform duration-500 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-cyan-500/50 group-hover:border-cyan-400/80">
                    <img
                      src="/software-developer-headshot.png"
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-sm -z-10 transition-all duration-500 group-hover:blur-md group-hover:from-cyan-500/40 group-hover:to-purple-500/40"></div>
                </div>
                <div className="text-center">
                  <h2 className="text-lg lg:text-xl font-bold text-white tracking-wide">John Doe</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Terminal - Full width on mobile, 75% on desktop */}
        <div className="w-full lg:w-3/4 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-4xl">
            <div className="mb-6">
              <h1 className="text-xl lg:text-2xl text-green-400 font-bold tracking-wide">John Doe Portfolio</h1>
            </div>

            <div
              ref={terminalRef}
              className="terminal-scroll bg-black border border-green-500/30 rounded-lg shadow-2xl min-h-[50vh] max-h-[60vh] lg:min-h-[70vh] lg:max-h-[80vh] p-4 lg:p-6 overflow-y-auto transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{
                boxShadow: isTerminalExpanding ? "0 0 40px rgba(0, 255, 0, 0.4)" : "0 0 30px rgba(0, 255, 0, 0.2)",
                background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
                scrollBehavior: "smooth",
              }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-xs lg:text-sm">johndoe@portfolio:~$</div>
              </div>

              <div className="mb-6 text-green-400">
                <div className="flex flex-wrap gap-1 lg:gap-2 text-xs lg:text-sm">
                  <span>help</span>
                  <span className="text-gray-500">|</span>
                  <span>about</span>
                  <span className="text-gray-500">|</span>
                  <span>projects</span>
                  <span className="text-gray-500">|</span>
                  <span>skills</span>
                  <span className="text-gray-500">|</span>
                  <span>contact</span>
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="hidden sm:inline">education</span>
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="hidden sm:inline">certifications</span>
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="hidden sm:inline">website-links</span>
                  <span className="text-gray-500">|</span>
                  <span>clear</span>
                </div>
              </div>

              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div key={index}>
                    {entry.command && (
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400 text-xs lg:text-sm shrink-0">johndoe@portfolio:~$</span>
                        <span className="text-white text-xs lg:text-sm">{entry.command}</span>
                      </div>
                    )}
                    <div className="text-xs lg:text-sm">{entry.output}</div>
                  </div>
                ))}

                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-green-400 text-xs lg:text-sm shrink-0">johndoe@portfolio:~$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-green-400 outline-none caret-green-400 text-xs lg:text-sm min-h-[44px] lg:min-h-auto py-2 lg:py-0"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
