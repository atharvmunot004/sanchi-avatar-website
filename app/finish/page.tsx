'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAvatarStore from '@/store/avatarStore'
import AvatarViewport from '@/components/AvatarViewport'

export default function FinishPage() {
  const router = useRouter()
  const { baseMesh, reset } = useAvatarStore()
  const [downloadingPNG, setDownloadingPNG] = useState(false)
  const [downloadingGLB, setDownloadingGLB] = useState(false)

  useEffect(() => {
    if (!baseMesh) {
      router.push('/')
    }
  }, [baseMesh, router])

  const handleDownloadPNG = async () => {
    setDownloadingPNG(true)
    try {
      // TODO: Implement PNG export API
      console.log('PNG download not yet implemented')
      alert('PNG download feature coming soon!')
    } catch (error) {
      console.error('Error downloading PNG:', error)
    } finally {
      setDownloadingPNG(false)
    }
  }

  const handleDownloadGLB = async () => {
    setDownloadingGLB(true)
    try {
      if (baseMesh) {
        // Download the GLB file directly
        const response = await fetch(baseMesh)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'avatar.glb'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error downloading GLB:', error)
    } finally {
      setDownloadingGLB(false)
    }
  }

  const handleCreateNew = () => {
    reset()
    router.push('/')
  }

  if (!baseMesh) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-12 py-12" style={{ maxWidth: '1480px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Your Avatar Is Ready!
          </h1>
          <p className="text-lg text-textSecondary">
            Here's the personalized avatar you created.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* 3D Preview */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div style={{ width: '420px', height: '420px', margin: '0 auto' }}>
              <AvatarViewport />
            </div>
          </div>

          {/* Actions Panel */}
          <div className="flex flex-col gap-6 w-full lg:w-auto lg:min-w-[400px]">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Download Your Avatar</h2>
              
              <div className="space-y-4">
                <button
                  onClick={handleDownloadPNG}
                  disabled={downloadingPNG}
                  className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloadingPNG ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <span>📥</span>
                      <span>Download PNG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadGLB}
                  disabled={downloadingGLB}
                  className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloadingGLB ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <span>📦</span>
                      <span>Download 3D GLB</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-textSecondary">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>3D preview of your avatar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Option to download PNG (coming soon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Option to download 3D GLB</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span>○</span>
                  <span>Option to regenerate with modifications (coming soon)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleCreateNew}
              className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all duration-200"
            >
              Create New Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

