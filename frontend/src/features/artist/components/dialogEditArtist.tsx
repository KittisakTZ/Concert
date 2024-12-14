import { Text, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { patchArtist } from "@/services/artist.service";
import { useState } from "react";

type DialogArtistProps ={ 
    getArtistsData: Function;
    artist_Id: string;
    artist_name: string;
    description: string;
}

const DialogEditArtist = ({getArtistsData, artist_Id, artist_name, description}: DialogArtistProps) => {
    const [patchArtistName, setPatchArtistName] = useState(artist_name);
    const [patchArtistDescription, setPatchArtistDescription] = useState(description);

    const handleUpdateArtist = async () => {
        if (!patchArtistName) {
            alert("Please enter an artist name."); 
            return;
        }
        if (!patchArtistDescription) {
            alert("Please enter a description.");
            return;
        }
        patchArtist({ 
            artist_Id: artist_Id,
            artist_name: patchArtistName,
            description: patchArtistDescription
        })
            .then((response) => {
                if (response.statusCode === 200) {
                    setPatchArtistName("");
                    setPatchArtistDescription("");
                    getArtistsData();
                } else if (response.statusCode === 400) {
                } else {
                    alert(`Unexpected error: ${response.message}`);
                }
            })
            .catch((error) => {
                console.error("Error updating artist:", error.response?.data || error.message);
                alert("Failed to update artist. Please try again.");
            });
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1" color="orange" variant="soft">Edit</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Artist</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2"><Strong>Id:</Strong> {artist_Id}</Text>
                    </label>
                    <label>
                        <Text size="2"><Strong>Current Artist Name:</Strong> {artist_name}</Text>
                    </label>
                    <label>
                        <Text size="2"><Strong>Current Description:</Strong> {description}</Text>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Artist Name
                        </Text>
                        <TextField.Root
                            defaultValue={artist_name}
                            placeholder="Enter the new artist name"
                            onChange={(event) => setPatchArtistName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New Description
                        </Text>
                        <TextField.Root
                            defaultValue={description}
                            placeholder="Enter the new description"
                            onChange={(event) => setPatchArtistDescription(event.target.value)}
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
                        <Button onClick={handleUpdateArtist}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogEditArtist;