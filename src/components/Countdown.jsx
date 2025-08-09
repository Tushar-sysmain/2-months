"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Countdown({ targetDate, onComplete }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date()

            if (difference <= 0) {
                onComplete()
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft()
            setTimeLeft(updatedTimeLeft)
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate, onComplete])

    const timeUnits = [
        { label: "Days", value: timeLeft.days, emoji: "🌞" },
        { label: "Hours", value: timeLeft.hours, emoji: "⏰" },
        { label: "Minutes", value: timeLeft.minutes, emoji: "⌛" },
        { label: "Seconds", value: timeLeft.seconds, emoji: "✨" },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    }

    return (
        <div className="w-full max-w-4xl relative">
            <motion.div
                className="absolute -top-16 -left-8 md:-top-24 md:-left-24 w-32 h-32 text-5xl md:text-6xl"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                🎀
            </motion.div>

            <motion.div
                className="absolute bottom-0 -right-5 md:-bottom-6 md:-right-24 text-5xl md:text-6xl"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                🎁
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            >
                {timeUnits.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            rotate: [-1, 1, -1],
                            transition: { rotate: { duration: 0.5, repeat: Number.POSITIVE_INFINITY } },
                        }}
                        className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-50" />

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-400" />
                        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400" />

                        <div className="relative p-6 flex flex-col items-center justify-center">
                            <motion.div
                                className="text-4xl mb-3"
                                animate={{
                                    y: [0, -10, 0],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: index * 0.3,
                                }}
                            >
                                {unit.emoji}
                            </motion.div>

                            <motion.div
                                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-500"
                                key={`${unit.label}-${unit.value}`}
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                {unit.value}
                            </motion.div>

                            <span className="text-purple-600 font-medium mt-2">{unit.label}</span>

                            <motion.div
                                className="absolute -bottom-2 -right-2 w-12 h-12 opacity-10 text-4xl"
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            >
                                {unit.emoji}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.p
                className="text-center mt-12 text-lg md:text-xl font-medium text-pink-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Until our special day ❤️
            </motion.p>
        </div>
    )
}
