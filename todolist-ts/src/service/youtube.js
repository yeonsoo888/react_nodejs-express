export default class YoutubeServ {
    constructor(key,opt) {
        this.key = key;
        this.obj = opt;
        this.getRequestOptions  = {
            method: "GET",
            redirect: 'follow',
        }
    }

    mostPopular() {
        return fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.obj.maxLength}&q=${this.obj.search}&type=video&key=${this.key}`,
            this.getRequestOptions
        )
        .then(response => response.json())
        .then(result => result.items)
    }

    search(query) {
            
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`, 
        this.getRequestOptions
        )
        .then(response => response.json())
        .then(result => result.items.map(item => ({...item,id:item.id.videoId})))
    }
}