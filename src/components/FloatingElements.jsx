"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
    const [elements, setElements] = useState([])

    useEffect(() => {
        // Create floating elements based on screen size
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        // Calculate number of elements based on screen size
        const count = Math.min(Math.floor((windowWidth * windowHeight) / 40000), 30)

        const newElements = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            size: Math.random() * 30 + 20,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            emoji: ["❤️", "💕", "💖", "💘", "💝", "🌸", "✨", "🌟", "🎀", "🌺"][Math.floor(Math.random() * 10)],
        }))

        setElements(newElements)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((element) => (
                <motion.div
                    key={element.id}
                    className="absolute text-2xl md:text-3xl opacity-10"
                    style={{
                        left: element.x,
                        top: element.y,
                        fontSize: element.size,
                    }}
                    animate={{
                        y: [element.y, element.y - 100, element.y],
                        x: [element.x, element.x + (Math.random() * 50 - 25), element.x],
                        rotate: [0, 360],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: element.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: element.delay,
                        ease: "easeInOut",
                    }}
                >
                    {element.emoji}
                </motion.div>
            ))}
        </div>
    )
}
