"use client"

import { motion } from "framer-motion"

export default function Message({ message }) {
    const lines = message.split("\n")

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-20 max-w-3xl mx-auto relative"
        >
            <motion.div
                className="absolute -top-2 -left-8 md:-top-0 md:-left-36 w-32 h-32 text-5xl md:text-6xl"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                💌
            </motion.div>

            <motion.div
                className="absolute -bottom-16 right-30 md:-bottom-20 md:-right-40 text-5xl md:text-6xl"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                💝
            </motion.div>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl md:py-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-center mb-10 animate-gradient"
            >
                A Letter From My Heart
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl relative"
            >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50" />

                {/* Border gradients */}
                <div className="absolute top-0 left-0 w-full h-2 rounded-se-lg bg-gradient-to-r from-pink-400 to-purple-400" />
                <div className="absolute bottom-0 right-0 w-full h-2 rounded-bl-lg bg-gradient-to-r from-purple-400 to-pink-400" />

                {/* Decorative elements */}
                <div className="absolute -top-5 -left-5 w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-3xl">💌</span>
                </div>

                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center transform -rotate-12">
                    <span className="text-3xl">❤️</span>
                </div>

                {/* Floating hearts */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-xl pointer-events-none"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.2,
                        }}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    >
                        {["❤️", "💕", "💖", "💘", "💝"][Math.floor(Math.random() * 5)]}
                    </motion.div>
                ))}

                <div className="relative z-10 text-gray-700 leading-relaxed space-y-4">
                    {lines.map((line, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.08 }}
                            className={`${line.trim() === "" ? "h-4" : ""} ${index === 0 ? "text-xl font-medium text-pink-600" : ""}`}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
