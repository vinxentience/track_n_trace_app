import React, { useRef, useState } from "react"
import { Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Flex, VStack, Heading } from '@chakra-ui/layout'
import { IconButton } from "@chakra-ui/button"
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Spacer, Button, Input } from "@chakra-ui/react"

export default function SignupEstablishment() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const eNameRef = useRef()
    const eAddRef = useRef()
    const passwordConfirmRef = useRef()
    const { signupEstablish } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")

    async function handleSubmit(e) {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords does not match')
        }
        
        try{
            setError('')
            setLoading(true)
            await signupEstablish(emailRef.current.value, passwordRef.current.value, eNameRef.current.value, eAddRef.current.value)
            history.push('/');
        } catch {
            setError('Failed to create an account.')
        }
            setLoading(false)
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
                    <Heading mb={6}> Sign Up </Heading>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Input type="email" ref={emailRef} placeholder="Enter your email here..." required />
                        </Form.Group>

                        <Form.Group id="eName">
                        <Form.Label>Establishment Name</Form.Label>
                        <Input type="text" ref={eNameRef} placeholder="Enter establishment name here..." required />
                        </Form.Group>

                        <Form.Group id="eAdd">
                        <Form.Label>Establishment Address </Form.Label>
                        <Input type="text" ref={eAddRef} placeholder="Enter establishment address here..." required />
                        </Form.Group>

                        <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Input type="password" ref={passwordRef} placeholder="Enter your password here..." required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Input type="password" ref={passwordConfirmRef} placeholder="Please Confirm your Password..." required />
                        </Form.Group> <br />

                        <Button colorScheme="teal" disabled={loading} className="w-100" type="submit"> Sign Up </Button>
                    </Form>
                    <div className="w-100 text-center mt-3"> 
                        <Link to="/login"> Already have an account? </Link>
                    </div>
                </Flex>
            </Flex>
      </VStack>
    )
}
