import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic'
import { Button, Grid } from '@mui/material'
import Config from '@/components/config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
        <Grid item xs={12} sx={{ p: 1 }}>
          <Button href='https://github.com/doerfli/harmonograph' target="_blank">
            <FontAwesomeIcon icon={faGithub} className="fa cursor-pointer" />
            Github Repository
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
