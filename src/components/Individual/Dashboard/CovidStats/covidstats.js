import React, { useEffect, useState } from 'react'
import Cards from './Cards/Cards'
import { Text, useDisclosure, Button, Box, Fade, Flex, Heading, Spacer, IconButton, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../../contexts/AuthContext';
import Sidebar from '../../Sidebar/Sidebar';
import { FaTh } from 'react-icons/fa'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import ClipLoader from 'react-spinners/HashLoader'

// import Chart from './Chart/Chart'
// import LocationPicker from './LocationPicker/LocationPicker'
// import { fetchData } from '../../api'
import axios from 'axios'
export default function CovidStats() {
    const [data, setData] = useState([])
    const { currentUser } = useAuth()
    const { isOpen, onToggle } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 6000)
    }, [])

    useEffect(() => {
        axios.get('https://covid19-api-philippines.herokuapp.com/api/summary')
        .then(res => {
            setData(res.data.data)
        }).catch(error => alert('There is an error with the API. (' + error + ')'))
    }, [])

    return (
        <>
        {
                loading ?  
                <>
                    <Flex width="100%" height="90vh" alignItems="center" justifyContent="center" textAlign="center">
                        <ClipLoader size={50} color={"#008080"} loading={loading}/>
                        <Text fontSize="2xl" textShadow="1px #f0f0f0" ml={5}> Track-n-Trace </Text>    
                    </Flex>
                </>
                :
                <>
                    <Flex w="100%" p="3" pos="fixed" zIndex="99" background={formBackground}>
                        <Box>
                            <Heading size="lg" fontWeight="semibold" mt="1.5" color="teal.500"> Track-n-Trace </Heading>
                        </Box>
                        <Spacer />
                        <Box>
                            <IconButton bgColor="transparent" mr="1" icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode} h="45px" w="45px">
                            Sign Up
                            </IconButton>
                            <Button borderRadius="10px" bgColor="teal.500" _hover={{background: 'teal.400'}} h="45px" w="45px" onClick={onToggle}><FaTh /></Button>
                        </Box>
                        <Fade in={isOpen}>
                            <Sidebar visibility={isOpen} userName={currentUser.email}/>
                        </Fade >
                    </Flex>

                
                <VStack w="100%">
                    <Cards 
                        badgeNameActive="Active Cases" 
                        badgeNameRecoveries="Recoveries"
                        badgeNameDeath="Deaths"
                        totalNumberActive={(data.active_cases + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        totalNumberRecoveries={(data.recoveries + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                        totalNumberDeath={(data.deaths + "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                        dateUpdated="Today!"/>
                        
                </VStack>
            </>
        }

        
        
        </>
    )
}
