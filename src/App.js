import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ReactAudioPlayer from 'react-audio-player';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 140,
    },
    card: {
        '&:hover': {
            backgroundColor: '#40e0d0',
        },
    },
    rotateIcon: {
        animation: "spin 4s linear infinite"
    }

}));

function App() {
    const classes = useStyles();

    const [listLagu, setListLagu] = useState([])
    const [searchKey, setSearchKey] = useState('eminem')
    const [music, setMusic] = useState('')

    useEffect(() => {
        getApi()
    }, [searchKey])

    const getApi = () => {
        Axios.get('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + searchKey, {
            headers: {
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                'x-rapidapi-key': '8adce0f710msh8382549a552d2fbp1371d7jsn4118078fd1a0'
            }
        })
            .then(function (response) {
                setListLagu(response.data.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const searchHandler = (value) => {
        if (value) {
            setSearchKey(value)
        }
    }

    console.log(listLagu)
    // console.log(searchKey)
    // console.log(music)

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <TextField id="standard-basic" style={{ width: '100%' }} label="Search Music Here" onChange={(e) => searchHandler(e.target.value)} />
            </div>
            <Grid container spacing={3}>
                {listLagu.map((item, index) => (
                    <Grid onClick={() => setMusic(item)} item key={index} xs={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.album.cover_big}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h2>
                                                {item.title_short}
                                            </h2>
                                            <p>
                                                {item.artist.name}
                                            </p>
                                        </div>
                                        <div>
                                            {item.id == music.id ? (
                                                <>
                                                    <img src={item.artist.picture} className={classes.rotateIcon} style={{ borderRadius: '50%', width: '50px' }} alt="" />
                                                    <style>{`
                                                    @keyframes spin {
                                                        0% { transform: rotate(0deg); }
                                                        100% { transform: rotate(360deg); }
                                                    }
                                                `}</style>
                                                </>
                                            ) : (
                                                <img src={item.artist.picture} style={{ borderRadius: '50%', width: '50px' }} alt="" />
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <ReactAudioPlayer
                style={{ position: 'fixed', bottom: 5, left: 0, right: 0, width: '100%' }}
                src={music.preview}
                autoPlay
                controls
                onEnded={() => setMusic('')}
                onPause={() => setMusic('')}
            />
        </div>
    );
}

export default App;
