import { useEffect, useState } from "react";
import { Table, Card, Flex, Text, Spinner } from "@radix-ui/themes";
import { getVenue } from "@/services/venue.service";
import { TypeVenueAll } from "@/types/response/response.venue";
import DialogAddVenue from "./components/dialogAddVenue";
import DialogEditVenue from "./components/dialogEditVenue";
import AlertDialogDeleteVenue from "./components/alertDialogDeleteVenue";

export default function VenueFeature() {
    const [venues, setVenues] = useState<TypeVenueAll[]>([]);
    const [loading, setLoading] = useState<boolean>(true);  // State for loading status

    // Fetch venue data
    const getVenueData = () => {
        setLoading(true);  // Set loading to true when fetching data
        getVenue().then((res) => {
            console.log(res);
            setVenues(res.responseObject);  // Update state with venue data
            setLoading(false);  // Set loading to false once data is fetched
        }).catch((error) => {
            console.error("Error fetching venues:", error);
            setLoading(false);  // Handle error by stopping the loading state
        });
    };

    useEffect(() => {
        getVenueData();  // Call API when the component mounts
    }, []);

    return (
        <div className="container w-full pt-2">
            <Card variant="surface" className="w-full max-w-4xl mx-auto p-4">
                <Flex className="w-full" direction="row" gap="2" justify="between" align="center">
                    <Text as="div" size="3" weight="bold">Venues</Text>
                    <DialogAddVenue getVenueData={getVenueData} /> {/* Add Venue dialog */}
                </Flex>

                {/* Show loading spinner while data is being fetched */}
                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <Spinner />
                        <Text size="2" className="ml-2">Loading venues...</Text>
                    </div>
                ) : (
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Venue Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Capacity</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>District</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Province</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Postal Code</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {venues.map((venue: TypeVenueAll) => (
                                <Table.Row key={venue.venue_Id}>
                                    <Table.RowHeaderCell>{venue.venue_Id}</Table.RowHeaderCell>
                                    <Table.Cell>{venue.venue_name}</Table.Cell>
                                    <Table.Cell>{venue.capacity}</Table.Cell>
                                    <Table.Cell>{venue.address}</Table.Cell>
                                    <Table.Cell>{venue.district}</Table.Cell>
                                    <Table.Cell>{venue.province}</Table.Cell>
                                    <Table.Cell>{venue.postal_code}</Table.Cell>
                                    <Table.Cell>
                                        <DialogEditVenue 
                                            getVenueData={getVenueData}
                                            venue_Id={venue.venue_Id}
                                            venue_name={venue.venue_name}
                                            capacity={venue.capacity}
                                            address={venue.address}
                                            district={venue.district}
                                            province={venue.province}
                                            postal_code={venue.postal_code}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <AlertDialogDeleteVenue 
                                            getVenueData={getVenueData}
                                            venue_Id={venue.venue_Id}
                                            venue_name={venue.venue_name}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                )}
            </Card>
        </div>
    );
}
