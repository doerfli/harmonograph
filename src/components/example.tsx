import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from "@mui/material";

export default function Example(props: any) {
    const { name, file, url } = props;
    
    const filename = "examples/" + file;

    return (    
        <Tooltip title="Click to Open" enterDelay={1000} enterNextDelay={1000} >
            <Card>
                <CardActionArea href={url}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="100%"
                        image={filename}
                        />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Tooltip>
    );
}