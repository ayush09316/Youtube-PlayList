const getChannelId = async (id: string) => {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=${id}&key=${process.env.API_KEY}`;
  
    try {
      const response = await fetch(url);
      const result = await response.json();
  
      if (result?.items && result.items.length > 0) {
        return result.items[0].id;
      } else {
        console.log('No channel ID found');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
export const getPlayList = async (id:string) => {
    
try {
    const CHANNEL_ID= await getChannelId(id);
    if(!CHANNEL_ID) return null;
    
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${CHANNEL_ID}&key=${process.env.API_KEY}`;

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