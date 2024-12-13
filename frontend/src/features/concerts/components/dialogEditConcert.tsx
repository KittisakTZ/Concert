import { Text, Dialog, Button, Flex, TextField, Strong } from "@radix-ui/themes";
import { patchConcert } from "@/services/concert.service";
import { useState } from "react";

type DialogConcertProps = {
    getConcertsData: Function;
    concert_Id: string;
    concert_name: string;
    date_time: string;
    description: string;
    rounds: number;
    status: string;
    venue_id: string;
    artist_id: string;
};

const DialogEditConcert = ({
    getConcertsData,
    concert_Id,
    concert_name,
    date_time,
    description,
    rounds,
    status,
    venue_id,
    artist_id,
}: DialogConcertProps) => {
    const [updatedConcertName, setUpdatedConcertName] = useState(concert_name);
    const [updatedDateTime, setUpdatedDateTime] = useState(date_time);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedRounds, setUpdatedRounds] = useState(rounds);
    const [updatedStatus, setUpdatedStatus] = useState(status);
    const [updatedVenueId, setUpdatedVenueId] = useState(venue_id);
    const [updatedArtistId, setUpdatedArtistId] = useState(artist_id);

    const handleUpdateConcert = async () => {
        if (!updatedConcertName || !updatedDateTime || !updatedVenueId || !updatedArtistId) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await patchConcert({
                concert_Id,
                concert_name: updatedConcertName,
                date_time: new Date(updatedDateTime),
                description: updatedDescription,
                rounds: updatedRounds,
                status: updatedStatus,
                venue_id: updatedVenueId,
                artist_id: updatedArtistId,
            });

            if (response.statusCode === 200) {
                getConcertsData(); // Refresh the data after updating
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error updating concert:", error);
            alert("An error occurred while updating the concert.");
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1" color="orange" variant="soft">Edit</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Concert</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2"><Strong>Id:</Strong> {concert_Id}</Text>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Concert Name
                        </Text>
                        <TextField.Root
                            defaultValue={concert_name}
                            placeholder="Enter the concert name"
                            onChange={(event) => setUpdatedConcertName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Date & Time
                        </Text>
                        <TextField.Root
                            type="datetime-local"
                            defaultValue={date_time}
                            onChange={(event) => setUpdatedDateTime(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextField.Root
                            defaultValue={description}
                            placeholder="Enter the concert description"
                            onChange={(event) => setUpdatedDescription(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Rounds
                        </Text>
                        <TextField.Root
                            type="number"
                            defaultValue={rounds.toString()}
                            onChange={(event) => setUpdatedRounds(parseInt(event.target.value))}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Status
                        </Text>
                        <TextField.Root
                            defaultValue={status}
                            placeholder="Enter the status"
                            onChange={(event) => setUpdatedStatus(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Venue ID
                        </Text>
                        <TextField.Root
                            defaultValue={venue_id}
                            placeholder="Enter the venue ID"
                            onChange={(event) => setUpdatedVenueId(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Artist ID
                        </Text>
                        <TextField.Root
                            defaultValue={artist_id}
                            placeholder="Enter the artist ID"
                            onChange={(event) => setUpdatedArtistId(event.target.value)}
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
                        <Button onClick={handleUpdateConcert}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogEditConcert;