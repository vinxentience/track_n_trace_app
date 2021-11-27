import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Icon, Text, Menu, MenuButton, Link } from '@chakra-ui/react'
export default function NavItem({navSize, title, iconItems, active}) {
    return (
        <Flex mt={30} flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"}>
            <Menu placement="left">
                <Link backgroundColor={active && "#AEC8CA"} p={3} borderRadius={8} _hover={{textDecor: 'none', backgroundColor: '#AEC8CA'}} w={navSize === "large" && "100%"}>
                    <MenuButton w="100%">
                        <Flex>
                            <Icon fontSize="xl" color={active ? "#82AAAD" : "gray.500"} as={iconItems}/>
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"}> {title} </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}
