import { postArtist } from "@/services/artist.service";
import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

type DialogArtistProps = {
    getArtistsData: Function;
}
const DialogAddArtist = ({getArtistsData}: DialogArtistProps) => {
    const [postArtistName, setPostArtistName] = useState("");
    const [postArtistDescription, setPostArtistDescription] = useState("");

    const handleCreateArtist = async () => {
        if(!postArtistName){
            alert("Please enter an artist name.");
            return;
        }
        try {
            const response = await postArtist({artist_name: postArtistName, description: postArtistDescription});
            if(response.statusCode === 200){
                setPostArtistName("");
                setPostArtistDescription("");
            }
        } catch (error) {
            alert("An error occurred while creating the artist.");
        }
        getArtistsData(); // Refresh the data
    };    

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1">Create</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create Artist</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Artist Name
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the artist name"
                            onChange={(event) => setPostArtistName(event.target.value)}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Artist Description
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the artist description"
                            onChange={(event) => setPostArtistDescription(event.target.value)}
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleCreateArtist}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default DialogAddArtist;