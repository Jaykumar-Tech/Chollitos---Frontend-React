import { useState, useEffect } from "react";
import { Text, CloseButton, Box } from "@chakra-ui/react";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(sessionStorage.getItem('banner') === 'show');
  const banner = `<div class="css-l375j"><svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-s1jdu2"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg><span class="chakra-text css-35ezg3">adidas information</span><p class="chakra-text rich_description css-1art13b">
  <h1>Hello Everyone</h1>This is blog, Do you want to see image<img src="https://www.french-bandit.com/cdn/shop/files/packshot-tapis-rafraichissant1_400x.jpg?v=1686921829"></p></div>`;

  useEffect(() => {
    if (!sessionStorage.getItem('banner')) {
      sessionStorage.setItem('banner', 'show');
      setIsOpen(true);
    }
  }, []);

  return (
    isOpen &&
    <Box
      p={2}
      bg={'white'}
      shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
      position="relative"
    >
      <CloseButton
        size={'sm'}
        position="absolute"
        right={1}
        top={1}
        onClick={() => {
          sessionStorage.setItem('banner', 'hide');
          setIsOpen(false);
        }}
      />
      <Text dangerouslySetInnerHTML={{ __html: banner }} />
    </Box>
  )
}

export default Banner;