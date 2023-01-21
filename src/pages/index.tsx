import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic'
import { Grid } from '@mui/material'
import Config from '@/components/config'

const Harmonograph = dynamic(() => import('../components/harmonograph').then((mod) => mod.default), {
  ssr: false,
})

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Config />
        </Grid>
        <Grid item xs={9}>
          <Harmonograph />
        </Grid>
      </Grid>
    </>
  )
}
