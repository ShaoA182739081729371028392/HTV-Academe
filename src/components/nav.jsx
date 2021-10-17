import React from 'react'

import {
    Link, Heading, VStack, Box,
    Button, ButtonGroup, IconButton, Text,
    useColorMode, Tabs, TabList, TabPanels, Tab, TabPanel,
    Modal,
    Lorem,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import { MdHome, MdContactPage } from "react-icons/md"
import { FaUserAlt } from "react-icons/fa"

function bottomNav() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Box w="100%" boxShadow="md" rounded="lg" bg="white">

                <Tabs size='lg' isFitted colorScheme="pink">
                    <TabList>
<<<<<<< HEAD
                        <Tab><MdHome fontSize='32px' /></Tab>
                        <Tab>
                            <Button onClick={() => {
                                console.log("asdf")
                                chrome.tabs.create({ url: "http://localhost:3000" });
                            }}>
                                <MdContactPage fontSize='28px' />
                            </Button>
                        </Tab>
||||||| c073af1
                        <Tab><MdHome fontSize='32px'/></Tab>
                        <Tab><MdContactPage fontSize='28px'/></Tab> 
                        <Tab onClick={onOpen}><FaUserAlt fontSize='24px'/></Tab> 
=======
                        <Tab><MdHome fontSize='32px' /></Tab>
                        <Tab onClick={() => {
                            console.log("asdf")
                            chrome.tabs.create({ url: "http://localhost:3000" });
                        }}>
                            <MdContactPage fontSize='28px' />
                        </Tab>
>>>>>>> cb4cf188d2b5d017cfd92362e2fdc38b6aa59b4b
                    </TabList>
                </Tabs>

                {/*
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={() => {
                        console.log("asdf")
                        chrome.tabs.create({ url: "http://localhost:3000" });
                    }}>
                        <MdContactPage fontSize='28px' />
                    </Button>
                </div>
                */}

            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
<<<<<<< HEAD
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Lorem count={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
||||||| c073af1
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Lorem count={2} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
=======
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Lorem count={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
>>>>>>> cb4cf188d2b5d017cfd92362e2fdc38b6aa59b4b
                </ModalContent>
            </Modal>
        </>
    )
}

export default bottomNav
