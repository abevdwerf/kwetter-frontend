export interface TweetInterface {
    id: string;
    userId: string;
    displayName: string;
    content: string;
    createdAt: Date;
}

export interface PostTweetInterface {
    userId: string;
    displayName: string;
    content: string;
}