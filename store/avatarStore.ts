import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AvatarState {
  gender: 'male' | 'female' | null
  baseMesh: string | null
  hairMesh: string | null
  apparelMesh: string | null
  userImage: string | null
  userName: string | null
  setGender: (gender: 'male' | 'female') => void
  setBaseMesh: (mesh: string) => void
  setHairMesh: (mesh: string | null) => void
  setApparelMesh: (mesh: string | null) => void
  setUserImage: (image: string | null) => void
  setUserName: (name: string | null) => void
  reset: () => void
}

const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      gender: null,
      baseMesh: null,
      hairMesh: null,
      apparelMesh: null,
      userImage: null,
      userName: null,
      setGender: (gender) => set({ gender, baseMesh: gender === 'male' ? '/assets/meshes/base_male.glb' : '/assets/meshes/base_female.glb' }),
      setBaseMesh: (mesh) => set({ baseMesh: mesh }),
      setHairMesh: (mesh) => set({ hairMesh: mesh }),
      setApparelMesh: (mesh) => set({ apparelMesh: mesh }),
      setUserImage: (image) => set({ userImage: image }),
      setUserName: (name) => set({ userName: name }),
      reset: () => set({ gender: null, baseMesh: null, hairMesh: null, apparelMesh: null, userImage: null, userName: null }),
    }),
    {
      name: 'avatar-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAvatarStore
