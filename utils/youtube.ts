

export const getPlayList = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${process.env.CHANNEL_ID}&key=${process.env.API_KEY}`;

try {
	const response = await fetch(url);
	const result = await response.json();
  
    return result;
} catch (error) {
	console.error(error);
    return null;
}
}


export const getDetails = async (videoId:string) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2Cid&playlistId=${videoId}&key=${process.env.API_KEY}`;
    
try {
	const response = await fetch(url);
	const result = await response.json();
    
    return result;

} catch (error) {
	console.error(error);
    return null;
}

};