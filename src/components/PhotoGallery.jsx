"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { XIcon } from "lucide-react"

export default function PhotoGallery({ photos }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const item = {
        hidden: { y: 50, opacity: 0 },
        show: { y: 0, opacity: 1 },
    }

    const frameStyles = [
        "border-[12px] border-pink-300 rounded-lg rotate-2 shadow-xl",
        "border-[12px] border-purple-300 rounded-lg -rotate-3 shadow-xl",
        "border-[12px] border-pink-200 rounded-lg rotate-1 shadow-xl",
        "border-[12px] border-purple-200 rounded-lg -rotate-2 shadow-xl",
        "border-[12px] border-pink-300 rounded-lg rotate-3 shadow-xl",
        "border-[12px] border-purple-300 rounded-lg -rotate-1 shadow-xl",
    ]

    const decorations = ["🌸", "💖", "✨", "💝", "💕", "🌺"]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="my-20 relative"
        >
            <motion.div
                className="absolute -top-2 -left-5 md:-top-6 md:-left-12 w-32 h-32 text-5xl md:text-6xl"
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
                📸
            </motion.div>

            <motion.div
                className="absolute -bottom-32 -right-20 md:-bottom-24 md:-right-24 w-32 h-32 text-5xl md:text-6xl"
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
                🎞️
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-center mb-12 animate-gradient"
            >
                Our Precious Moments
            </motion.h2>

            <motion.div className="flex flex-wrap justify-center gap-10 md:gap-12" >
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{
                            scale: 1.05,
                            rotate: 0,
                            zIndex: 10,
                            transition: { duration: 0.3 },
                        }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        className={`relative bg-white p-3 ${frameStyles[index % frameStyles.length]} hover:shadow-2xl transition-all duration-300 cursor-pointer w-full sm:w-[calc(50%-2.25rem)] lg:w-[calc(33.333%-2.5rem)]`}
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div
                            className="absolute -top-6 -right-6 text-3xl animate-float"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {decorations[index % decorations.length]}
                        </div>

                        <div className="relative h-64 w-full ">
                            <Image
                                src={photo.src || "/placeholder.svg"}
                                alt={photo.alt}
                                fill
                                sizes="200"
                                className="object-contain h-full transition-all duration-500"
                            />

                            {/* Overlay on hover */}
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-gradient-to-t from-rose-500/40 to-transparent flex items-end justify-center p-4"
                                />
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md"
                        >
                            <span className="text-sm text-pink-600 whitespace-nowrap">{photo.alt}</span>
                        </motion.div>

                        {/* Decorative tape */}
                        <div className="absolute -top-3 left-1/4 w-10 h-6 bg-pink-200/80 rotate-12 rounded-sm"></div>
                        <div className="absolute -top-3 right-1/4 w-10 h-6 bg-purple-200/80 -rotate-12 rounded-sm"></div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { type: "spring", stiffness: 300, damping: 25 },
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="relative max-w-3xl max-h-[80vh] bg-white p-4 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-6 -left-6 text-4xl animate-float">✨</div>
                            <div className="absolute -bottom-6 -right-6 text-4xl animate-float-delay">✨</div>

                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedPhoto.src || "/image.png"}
                                    alt={selectedPhoto.alt}
                                    height={400}
                                    width={300}
                                    className="object-cover h-full w-full"
                                />
                            </div>

                            {/* <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-8 left-0 right-0 text-center"
                            >
                                <p className="text-lg font-medium text-pink-600 bg-white/80 mx-auto py-2 px-4 rounded-full inline-block">
                                    {selectedPhoto.alt}
                                </p>
                            </motion.div> */}

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                                onClick={() => setSelectedPhoto(null)}
                            >
                                <XIcon />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
