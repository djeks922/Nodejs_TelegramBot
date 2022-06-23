import fs from 'fs'

export default async (file) => {
    try {
      await fs.promises.access(file, fs.constants.F_OK)
      return true
    } catch (e) {
      return false
    }
  }