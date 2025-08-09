"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export default function Loader() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const generated = Array.from({ length: 12 }).map(() => ({
            x: Math.random() * width,
            y: -100,
            rotate: Math.random() * 360,
            delay: Math.random() * 5,
            duration: Math.random() * 5 + 5,
            emoji: ["❤️", "💕", "💖", "💝", "🌸", "✨"][Math.floor(Math.random() * 6)],
        }));

        setItems(generated);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 z-50">
            <div className="absolute inset-0 overflow-hidden">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-3xl md:text-5xl will-change-transform"
                        initial={{
                            x: item.x,
                            y: item.y,
                            opacity: 0.7,
                            rotate: item.rotate,
                        }}
                        animate={{
                            y: window.innerHeight + 100,
                            rotate: item.rotate + 180,
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: item.delay,
                        }}
                    >
                        {item.emoji}
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="flex flex-col items-center z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="relative mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        className="w-32 h-32 relative"
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >

                        <div className="absolute inset-0 rounded-full border-4 border-pink-300 border-t-pink-500 animate-spin"></div>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                            <span className="text-5xl">❤️</span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.p
                        className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-2 animate-gradient"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        Loading our love story...
                    </motion.p>

                    <motion.div
                        className="flex justify-center space-x-2 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-pink-500"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
