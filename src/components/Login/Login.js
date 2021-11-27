import React, { useRef, useState } from "react"
import { Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Flex, VStack, Heading } from '@chakra-ui/layout'
import { IconButton } from "@chakra-ui/button"
import { FaSun, FaMoon, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Spacer, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    async function handleSubmit(e) {
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
            history.push('/redirector')
        } catch {
            console.log('error')
            setError('Failed to sign in.')
        }
            
    }
    return (
       
        <VStack p={5}>
          <Flex w="100%">
            <Heading size="lg" fontWeight="semibold" color="cyan.400"> 
              Track-n-Trace
            </Heading>
            <Spacer></Spacer>
            <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}></IconButton>
            </Flex>

            <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={formBackground} p={12} rounded={6}>
                    <Heading mb={6}> Log In </Heading>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Input type="email" ref={emailRef} placeholder="Enter your email..." required />
                    </Form.Group>
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        ref={passwordRef} 
                        placeholder={show ? "Enter your password..." : "**************"}
                        required
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" ml={5} size="sm" onClick={handleClick}>
                        {show ? <FaEyeSlash color="gray.300" /> : <FaEye color="gray.300" /> }
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    </Form.Group>
                    <br />
                    <Button colorScheme="teal" disabled={loading} className="w-100" type="submit">
                    Log In
                    </Button>
                </Form>
                    <div className="w-100 text-center mt-3"> 
                        <Link to='/forgot-password'> Forgot Password? </Link> <br />
                        <Link to="/signup"> Create an Account </Link>
                    </div>
                </Flex>
            </Flex>
        </VStack>  
    )
}
