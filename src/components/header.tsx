import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faScribble, faWaveform } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography, useTheme } from "@mui/material";

export default function Header() {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box sx={{ flexGrow: '1' }}>
                <Button href="/">
                    <FontAwesomeIcon icon={faWaveform as IconProp} className="fa-2xl cursor-pointer" />
                    <Typography variant="h4" sx={{ underline: 'none', color: theme.palette.text.primary, ml: 1 }}>Harmonograph</Typography>
                </Button>
            </Box>
            
            <Box sx={{ flexGrow: '0', alignSelf: 'end'}}>
                <Button href='/examples' variant="text" sx={{ mr: 1 }}>
                    <FontAwesomeIcon icon={faScribble as IconProp} className="fa cursor-pointer" />
                    Examples
                </Button>
                <Button href='https://github.com/doerfli/harmonograph' target="_blank">
                    <FontAwesomeIcon icon={faGithub as IconProp} className="fa cursor-pointer" />
                    Github Repository
                </Button>
            </Box>
        </Box>
    );

}