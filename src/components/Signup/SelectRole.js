import React from 'react'
import { Flex, VStack, Heading } from '@chakra-ui/layout'
import { IconButton } from "@chakra-ui/button"
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Spacer, Box, Image, Text, Badge } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import Icon1  from '../../images/person.svg'
import Icon2  from '../../images/building.svg'
export default function SelectRole() {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    const textColor =  useColorModeValue("gray.500", "white")
    return (
        <VStack>
          <Flex w="100%" p="3">
            <Heading size="lg" fontWeight="semibold" color="cyan.400"> 
              Track-n-Trace
            </Heading>
            <Spacer></Spacer>
            <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}></IconButton>
            </Flex>
        
        <Box p={4} display={{ md: "flex" }} mt="80px" alignContent="center" alignItems="center">
        <Link to="/individual/signup-form">
        <Box pos="relative" justifyContent="center"  mt={{ base: 4, md: 0 }} ml={{ md: 6 }} boxShadow="2xl" p="6" rounded="md" background={formBackground} transform="auto" transition="all 0.5s ease-in-out" _hover={{ scale: "1.05" }}>
        <Image src={Icon1} height="160px" width="160px" marginBottom="10px"/>
            <Badge ml="1" colorScheme="teal">
            Individual
            </Badge>
            <Text color={textColor} fontSize="lg" fontWeight="semibold" fontStyle="italic">
            (resident, local, citizen, etc.)
            </Text>
            <Box pos="absolute" bottom="0" bgColor="teal" width="100%" h={3} ml="-24px" borderBottomRightRadius="5px" borderBottomLeftRadius="5px"> </Box>
        </Box>
        </Link>
        <Link to="/establishment/signup-form">
        <Box pos="relative" mt={{ base: 4, md: 0 }} ml={{ md: 6 }} boxShadow="2xl" p="6" rounded="md" background={formBackground} transform="auto" transition="all 0.5s ease-in-out" _hover={{ scale: "1.05" }}>
            <Image src={Icon2} height="160px" width="160px" marginBottom="10px"/>
            <Badge ml="1" colorScheme="teal">
            Establishment
            </Badge>
            <Text color={textColor} fontSize="lg" fontWeight="semibold">
                (business organization, public institution, store, etc.)
            </Text>
            <Box pos="absolute" bottom="0" bgColor="teal" width="100%" h={3} ml="-24px" borderBottomRightRadius="5px" borderBottomLeftRadius="5px"> </Box>
        </Box>
        </Link>
        </Box>
        </VStack>
    )
}
