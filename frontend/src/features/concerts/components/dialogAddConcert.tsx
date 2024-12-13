import { postConcert } from "@/services/concert.service";
import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

type DialogConcertProps = {
    getConcertsData: Function;
};

const DialogAddConcert = ({ getConcertsData }: DialogConcertProps) => {
    const [concertName, setConcertName] = useState("");
    const [concertDescription, setConcertDescription] = useState("");
    const [concertDateTime, setConcertDateTime] = useState("");
    const [concertRounds, setConcertRounds] = useState(0);
    const [concertStatus, setConcertStatus] = useState("");
    const [venueId, setVenueId] = useState("");
    const [artistId, setArtistId] = useState("");

    const handleCreateConcert = async () => {
        if (!concertName || !concertDateTime || !venueId || !artistId) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            const response = await postConcert({
                concert_name: concertName,
                date_time: new Date(concertDateTime),
                description: concertDescription,
                rounds: concertRounds,
                status: concertStatus,
                venue_id: venueId,
                artist_id: artistId,
            });

            if (response.statusCode === 200) {
                setConcertName("");
                setConcertDescription("");
                setConcertDateTime("");
                setConcertRounds(0);
                setConcertStatus("");
                setVenueId("");
                setArtistId("");
            } else {
            }
        } catch (error) {
            alert("An error occurred while creating the concert.");
        } getConcertsData(); // Refresh the data
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1">Create</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create Concert</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Concert Name
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the concert name"
                            onChange={(event) => setConcertName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the concert description"
                            onChange={(event) => setConcertDescription(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Date & Time
                        </Text>
                        <TextField.Root
                            type="datetime-local"
                            onChange={(event) => setConcertDateTime(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Rounds
                        </Text>
                        <TextField.Root
                            type="number"
                            onChange={(event) => setConcertRounds(parseInt(event.target.value))}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Status
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the status"
                            onChange={(event) => setConcertStatus(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Venue ID
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the venue ID"
                            onChange={(event) => setVenueId(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Artist ID
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the artist ID"
                            onChange={(event) => setArtistId(event.target.value)}
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
                        <Button onClick={handleCreateConcert}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogAddConcert;