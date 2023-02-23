import { Box, useColorModeValue, Text} from '@chakra-ui/react'
import { IoLogoGithub } from 'react-icons/io5'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <Box display="flex" pt={4} gap={3} flexDirection="row" alignItems="center" justifyContent="center" mt={2}opacity={0.4} fontSize="xl">
      <Text fontWeight="bold" color={useColorModeValue('black','white')}>&copy; {new Date().getFullYear()} {t("footer")}</Text>
      <Text fontSize="3xl" pb={1}><a href="https://github.com/rebeccacombs/email-writer"><IoLogoGithub/></a></Text>
    </Box>
  )
}

export default Footer