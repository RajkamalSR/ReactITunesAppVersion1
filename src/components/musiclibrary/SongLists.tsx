import * as React from 'react';
import { useState, useEffect, Dispatch } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from "react-infinite-scroll-component";

import loadingIcon from './../../assets/images/loading.gif';

import { useDispatch, useSelector } from 'react-redux';

import { getSearchSongs } from '../../redux/actions/index';

export default function SongListsComponent() {
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [findSongValue, setFindSongValue] = useState<string>('');
    const [songLists, setSongLists] = useState<any>([]);
    let baseURL: string = "https://itunes.apple.com/search";
    let songlistData = useSelector((state:any) => state.data)


    const fetchData = async (artistName: string) => {
        setLoading(true);
        dispatch(getSearchSongs());
        /*try {
            const { data: response } = await axios.get(baseURL + "?term=" + artistName);
            setSongLists(response.results);
        } catch (error) {
            console.error(error);
        }*/
        setLoading(false);
    }

    useEffect(() => {
        fetchData("akon");
    }, []);


    if (!songLists) return null;

    function searchByName(e: string) {
        e ? fetchData(e) : fetchData("akon")
    }

    return (
        <>
            <div className='heading'>
                <h2>Music Playlist</h2>
                {loading && <div><img src={loadingIcon} alt="Loading..." className='loadin-icon' /></div>}
            </div>


            <div className='search-wrapper'>
                <div className='find-filter'>
                    <input type="text" placeholder="Search by artist, album or song.." onChange={(e) => searchByName(e.target.value)}></input>
                </div>

            </div>

            <div className='songlist-wrapper'>

                {!loading && (
                    <div className='songlist-content'>
                        <div className="songlist">
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <InfiniteScroll
                                    dataLength={10}
                                    next={() => fetchData("akon")}
                                    hasMore={true}
                                    loader={<div className='list-loader-icon'><img src={loadingIcon} alt="Loading..." className='loadin-icon' /></div>}
                                    height={600}
                                    endMessage={
                                        <p style={{ textAlign: "center" }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {songLists.map((item: any, index: any) =>
                                    (
                                        <ListItem alignItems="flex-start" key={index}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={item.artworkUrl100} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item?.artistName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                        >
                                                            {item.collectionName}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <audio controls>
                                                <source src={item.previewUrl} type="audio/mp4" />
                                            </audio>
                                        </ListItem>
                                    )
                                    )}
                                </InfiniteScroll>


                            </List>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
