import dynamic from 'next/dynamic'
import { Button, Grid } from '@mui/material'
import Config from '@/components/config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Example from '@/components/example';

export default function Examples() {

    const examples = [
        {
            name: "Example 1",
            file: "01.png",
            slug: "djEkMSw5NiwwOzYsMjIsMC41fDAuMDEsMyw2MCw="
        },
        {
            name: "Example 2",
            file: "02.png",
            slug: "djEkMSw5NiwwOzIsMzQsMS4yNXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 3",
            file: "03.png",
            slug: "djEkMSw5NiwwOzQsMzQsMXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 4",
            file: "04.png",
            slug: "djEkMiw5NiwwOzYsMzQsMXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 5",
            file: "05.png",
            slug: "djEkMSw1MCwwOzEsNTAsMC41fDIsNDksMDsyLDYxLDAuNXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 6",
            file: "06.png",
            slug: "djEkMSwxMDAsMDsxLDEwMCwwLjV8OCwyMCwwOzgsMjAsMC41fDAuMDEsMyw2MCw="
        },
        {
            name: "Example 7",
            file: "07.png",
            slug: "djEkMSwxMDAsMDsxLDEwMCwwLjV8NSwyMCwwOzMsNzUsMC41fDAuMDEsMyw2MCw="
        },
        {
            name: "Example 8",
            file: "08.png",
            slug: "djEkMSwxMDAsMDsxLDEwMCwwLjV8NywyMCwwOzIsODQsMC41fDAuMDEsMyw2MCw="
        },
        {
            name: "Example 9",
            file: "09.png",
            slug: "djEkMiwxMDAsMDsyLDYzLDAuNXwzLDc5LDA7Niw0MywwLjV8MC4wMSwzLDYwLA=="
        },
        {
            name: "Example 10",
            file: "10.png",
            slug: "djEkMSw1MCwwOzEsNTAsMC41fDMsNTAsMDszLDUwLDAuNXw0LDUwLDA7NCw1MCwwLjV8Niw1MCwwOzYsNTAsMC41fDAuMDEsMyw2MCw="
        },
        {
            name: "Example 11",
            file: "11.png",
            slug: "djEkMSw1MCwwOzEsNTAsMC41fDMsNTAsMDszLDUwLDAuNXw2LDMxLDA7Niw1MCwwLjV8Myw1MCwwOzcsNTAsMC4yNXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 12",
            file: "12.png",
            slug: "djEkMSw1MCwwOzEsNTAsMC41fDMsNTAsMDsyLDUwLDAuNXw2LDMxLDA7Miw1MCwwLjV8Nyw1MCwwOzIsNTAsMC4yNXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 13",
            file: "13.png",
            slug: "djEkMSwxMDAsMDsxLDUwLDAuNXwxLDEwMCwwOzEsMzMsMC41fDEsNjYsMDs1LDQ2LDAuNXwwLjAxLDMsNjAs"
        },
        {
            name: "Example 14",
            file: "14.png",
            slug: "djEkMSwxMDAsMDsxLDUwLDAuNXwxLDEwMCwwOzEsMzMsMC41fDMsNjYsMDs2LDQ2LDEuNzV8MC4wMSwzLDYwLA=="
        },
        {
            name: "Example 15",
            file: "15.png",
            slug: "djEkMiwxMDAsMDs0LDYzLDAuMjV8Niw3OSwwLjI1OzQsNzYsMC4yNXwwLjAxLDMsNjAs"
        },
    ];

    return (
        <Grid container spacing={4}>
            {[examples.map((e, i) =>
                <Grid item key={i} xs={12} md={4} sx={{ p: 1 }} > 
                    <Example name={e.name} file={e.file} slug={e.slug} />
                </Grid>
            )]}
        </Grid>
    )
}
