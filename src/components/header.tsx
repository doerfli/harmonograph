import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function Header() {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box sx={{ flexGrow: '1' }}>
                <Button href="/">
                    <Typography variant="h4" sx={{ underline: 'none', color: theme.palette.text.primary }}>Harmonograph</Typography>
                </Button>
            </Box>
            
            <Box sx={{ flexGrow: '0', alignSelf: 'end'}}>
                <Button href='/examples' variant="text" sx={{ mr: 1 }}>Examples</Button>
                <Button href='https://github.com/doerfli/harmonograph' target="_blank">
                    <FontAwesomeIcon icon={faGithub} className="fa cursor-pointer" />
                    Github Repository
                </Button>
            </Box>
        </Box>
    );

}