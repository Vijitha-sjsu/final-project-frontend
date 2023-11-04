import React, { memo, ReactElement } from "react";
import format from "date-fns/format";
import { Avatar, Card, CardActions, CardContent, CardHeader, styled, Typography } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';



export interface TweetComponentProps {
    id: number;
    user: {
        id: number;
        username: string;
    }
    time: string;
    textContent: string;
}

function CustomAvatar(name: string) {
    const initials = getInitials(name)
    const backgroundImage = "url(" + getAvatarBackgroundImage(initials) + ")"
  
    return (
      <Box
        aria-label={initials}
        component={Avatar}
        sx={{
          width: 48,
          height: 48,
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff', 
          fontWeight: 'bold',
          fontSize: '1.6rem',
          fontFamily: 'Nunito, sans-serif', 
          textShadow: '2px 2px 0px #000000'}}
      >
        {initials}
      </Box>
    );
  }

const getInitials = (name) => {
    return name.split(" ").map((n: string)=>n[0].toUpperCase()).join("")
}

function hashStringToNumber(str) {
    let hash = 5381;  // Seed value
    let char;
  
    for (let i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);  // Get the Unicode value of the character
      hash = ((hash << 5) + hash) + char;  // Bitwise left shift by 5, then add the hash and the character code
    }
  
    return hash;
  }

const getAvatarBackgroundImage = (initials) => {
    const urls = ['https://media.istockphoto.com/id/938335974/photo/aerial-view-of-kualoa-area-of-oahu-hawaii.jpg?s=612x612&w=0&k=20&c=OqqkjtRGFffwCx5Ac4kyfO9AReN-wnc6hGW8jJp7vok=', 
    'https://www.istockphoto.com/photo/na-pali-coast-with-ship-hawaii-gm1417147846-464449384?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Ftravel%2Fhawaii&utm_medium=affiliate&utm_source=unsplash&utm_term=Hawaii+images+%26+pictures%3A%3A%3A', 
    'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D', 
    'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D',
    'https://media.istockphoto.com/id/1344587707/photo/secret-small-beach-in-the-bay-of-anse-lazio-beach-praslin-seychelles.webp?b=1&s=170667a&w=0&k=20&c=qh6zmW2qwhz6EO44gvJhD48StmcR9M3qdS_W0-0wQMg=', 
    'https://www.studentuniverse.com/blog/wp-content/uploads/2014/04/Most-Beautiful-Places-to-Travel-Featured-Image.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjpLB6tZzK8dUmxvczt7uG3lRG6WyGLp2KQ&usqp=CAU',
    'https://imageio.forbes.com/specials-images/imageserve/651cfae0d249113aaf7c3cc2/Northern-Lights-bucket-list-travel/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/imageserve/651cfb3e3f072b8505bcf99f/Burj-Khalifa-in-Dubai-bucket-list-travel/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/imageserve/651cfbc58b3e759b3ea6472d/Taj-Mahal--Agra--India-bucket-list-travel/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/imageserve/651cfb0f0007b1e51a147fc0/stonehenge-bucket-list-travel/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/imageserve/651cf933d5e6cb1cc24ff1ce/London-Big-Ben-bucket-list-travel/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/imageserve/651cf7ec051bec4da626f99e/Sunrise-at-Yosemite-National-Park-travel-bucket-list/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/dam/imageserve/1141969923/960x0.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/blogs-images/laurabegleybloom/files/2019/09/Tokyo-skyline-from-Tobu-Levant-Hotel-Photo-by-Jonathan-Bloom-1200x801.jpg?format=jpg&width=1440',
    'https://imageio.forbes.com/specials-images/dam/imageserve/594409341/960x0.jpg?format=jpg&width=1440',
    'https://media.cntraveler.com/photos/5bb4e2816477eb358f142ca4/16:9/w_2580%2Cc_limit/Great-Sand-Dunes-GettyImages-1034057512.jpg',
    'https://media.cntraveler.com/photos/6488ae5d26739c257844b0ed/master/w_2580%2Cc_limit/Arches-National-Park-lauren-pandolfi-sbymMSXYHvo-unsplash.jpg',
    'https://media.cntraveler.com/photos/5e1380ce5a0316000864edde/master/w_2580%2Cc_limit/Bryce-Canyon-National-Park-GettyImages-921951796.jpg',
    'https://media.cntraveler.com/photos/6488ae8fc39a02ba647f7b49/master/w_2580%2Cc_limit/Death-Valley-National-Park-GettyImages-513051710.jpg',
    'https://media.cntraveler.com/photos/6488ae86add73e0d14b17fa9/master/w_2580%2Cc_limit/Cuyahoga-Valley-National-Park-ally-griffin-c54br2QE_L0-unsplash.jpg',
    'https://media.cntraveler.com/photos/5ea78af3149c56000808d318/master/w_2580%2Cc_limit/Gates-of-the-Arctic-National-Park-GettyImages-520727780.jpg',
    'https://media.cntraveler.com/photos/5ea78af7f7f62f00085493ce/master/w_2580%2Cc_limit/Glacier-Bay-GettyImages-555743985.jpg',
    'https://media.cntraveler.com/photos/5ea78b1e149c56000808d31a/master/w_2580%2Cc_limit/Joshua-Tree-National-Park-GettyImages-758302569.jpg',
    'https://media.cntraveler.com/photos/5ea78b22149c56000808d31b/master/w_2580%2Cc_limit/Kenai-Fjords-National-Park-GettyImages-543126005.jpg',
    'https://media.cntraveler.com/photos/6488aeac1b82d36ab296a8c0/master/w_2580%2Cc_limit/Kings-Canyon-National-Park-GettyImages-482750223.jpg',
    'https://media.cntraveler.com/photos/6488aecce86ef621f54af98a/master/w_2580%2Cc_limit/Pinnacles-National-Park-will-truettner-YAnOTaxbuaM-unsplash.jpg',
    'https://media.cntraveler.com/photos/6488aedd93447f35378f3bb3/master/w_2580%2Cc_limit/Sequoia-National-Park-dave-herring-4tiTrEKRmnM-unsplash.jpg',
    'https://media.cntraveler.com/photos/6488aedaadd73e0d14b17fb3/master/w_2580%2Cc_limit/Virgin-Islands-National-Park-cyrus-crossan-2fSeJFPHCHM-unsplash.jpg',
    'https://media.cntraveler.com/photos/6488aee126739c257844b0f1/master/w_2580%2Cc_limit/Voyageurs-National-Park-GettyImages-170943177.jpg',
    'https://media.cntraveler.com/photos/5e0648081334d900088b0a21/master/w_2580%2Cc_limit/New-Mexico-White-Sands-GettyImages-1154170319.jpg',
    'https://media.cntraveler.com/photos/6488aeeb9a743d1dc8c7585a/master/w_2580%2Cc_limit/Yellowstone-National-Park-denys-nevozhai-LMU2w-K4J7k-unsplash.jpg'
]

    return urls[hashStringToNumber(initials)%(urls.length-1)]
} 

const TweetComponent: React.FC<TweetComponentProps> = memo(({ id, user, time, textContent}): ReactElement => {
    const userId = "fakeUserID" 

    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardHeader
                avatar={ CustomAvatar(user.username)}
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title= {user.username}
                subheader= {format(new Date(time), "MMM d")}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {textContent}
                </Typography>
            </CardContent>
        </Card>
    
    )});

export default TweetComponent;
