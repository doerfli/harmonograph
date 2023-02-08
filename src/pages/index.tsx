import dynamic from 'next/dynamic'
import { Button, Grid } from '@mui/material'
import Config from '@/components/config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Harmonograph = dynamic(() => import('../components/harmonograph').then((mod) => mod.default), {
  ssr: false,
})

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
