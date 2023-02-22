import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" mt={2}opacity={0.4} fontSize="lg">
      &copy; {new Date().getFullYear()} Team LBR. All Rights Reserved.
    </Box>
  )
}

export default Footer