export interface Story {
    id: number;
    url: string;
}



export interface UserStory {
    username: string;
    profile_pic: string;
    stories: Story[]
}