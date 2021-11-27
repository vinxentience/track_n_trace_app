import React from 'react'
import { Box, Badge, Text, } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode"

function Cards({badgeNameActive, badgeNameRecoveries, badgeNameDeath, dateUpdated, totalNumberActive, totalNumberRecoveries, totalNumberDeath}) {
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    
    return (
        <>
        <Box p={4} display={{ md: "flex" }} mt="80px">
        
        <Box pos="relative" mt={{ base: 4, md: 0 }} ml={{ md: 6 }} boxShadow="2xl" p="6" rounded="md" background={formBackground}>
            <Badge ml="1" colorScheme="red">
            {badgeNameActive}
            </Badge>
            <Text color="red.500" fontSize="6xl" fontWeight="semibold">
            +{totalNumberActive}
            </Text>
            <Box pos="absolute" bottom="0" bgColor="red.500" width="100%" h={3} ml="-24px" borderBottomRightRadius="5px" borderBottomLeftRadius="5px"> </Box>
        </Box>

        <Box pos="relative" mt={{ base: 4, md: 0 }} ml={{ md: 6 }} boxShadow="2xl" p="6" rounded="md" background={formBackground}>
            <Badge ml="1" colorScheme="green">
            {badgeNameRecoveries}
            </Badge>
            <Text color="green.500" fontSize="6xl" fontWeight="semibold">
            +{totalNumberRecoveries}
            </Text>
            <Box pos="absolute" bottom="0" bgColor="green.500" width="100%" h={3} ml="-24px" borderBottomRightRadius="5px" borderBottomLeftRadius="5px"> </Box>
        </Box>

        <Box pos="relative" mt={{ base: 4, md: 0 }} ml={{ md: 6 }} boxShadow="2xl" p="6" rounded="md" background={formBackground}>
            <Badge ml="1" colorScheme="yellow">
            {badgeNameDeath}
            </Badge>
            <Text color="yellow.500" fontSize="6xl" fontWeight="semibold">
            +{totalNumberDeath}
            </Text>
            <Box pos="absolute" bottom="0" bgColor="yellow.500" width="100%" h={3} ml="-24px" borderBottomRightRadius="5px" borderBottomLeftRadius="5px"> </Box>
        </Box>
        </Box>
        </>
    )
}

export default Cards
