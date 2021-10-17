import React from 'react'
import { VStack, HStack, Text, Switch, StackDivider, Spacer, Select} from "@chakra-ui/react"

function Settings() {
    //Settings Fake Databases
    
    const toggleSettings = [
        
        {
            id: 2,
            default: true,
            body: "Show synonyms via double click ",
        },
        {
            id: 3,
            default: false,
            body: "Show definitions via double click",
        },
        {
            id: 4,
            default: true,
            body: "Simplify passages via triple click",
        },
    ];
    const folderSelect = [
        {
            id: 1,
            name: "Chemistry",
        },
        {
            id: 2,
            name: "Calculus II",
        },
        {
            id: 3,
            name: "Forex Trading",
        },
        {
            id: 4,
            name: "How to Rap",
        },
    ];

    const notetitle = "MyFolder";
    

    return (
        
        <VStack divider={<StackDivider />} borderColor='#D7DCE2' p='1' alignItems="stretch">
            //Toggleable Settings
            {toggleSettings.map((setting) => (
                <HStack key={setting.id} p='1.5'>
                    <VStack alignItems="stretch">
                        <Text fontSize="md">{setting.body}</Text>
                        <Text fontSize="md" fontWeight="bold">{setting.domain}</Text>
                    </VStack>
                    <Spacer/>
                    <Switch size="lg" defaultChecked={setting.default}/>
                </HStack>
            ))}
            //Selectable Settings
            <HStack p='1.5'>
                <Text fontSize="md">{notetitle}</Text>
                <Spacer/>
                <Select bg='#FFFFF' paddingLeft="25px" placeholder="Select Folder">
                    <option value="addnew">
                        Add New Folder
                    </option>
                    {folderSelect.map((folder) => (
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                </Select>
            </HStack>
        </VStack>
    );
}

export default Settings;
