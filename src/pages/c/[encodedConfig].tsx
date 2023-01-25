import dynamic from 'next/dynamic'
import { Button, Grid } from '@mui/material'
import Config from '@/components/config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { decodeConfig } from '@/util/config';
import { loadConfig } from '@/redux/slices/pendulums';

const Harmonograph = dynamic(() => import('../../components/harmonograph').then((mod) => mod.default), {
    ssr: false,
})

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();

    if (router.isReady) {
        const encodedConfig = router.query.encodedConfig;
        console.log(encodedConfig);
        setTimeout(() => dispatch(loadConfig(decodeConfig(encodedConfig as string))), 500);
    }

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
