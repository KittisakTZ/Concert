import { useEffect, useState } from "react";
import { Table, Card, Flex, Text } from "@radix-ui/themes";
import { getArtist } from "@/services/artist.service";
import { TypeArtistAll } from "@/types/response/response.artists";
import DialogAddArtist from "./components/dialogAddArtist";
import DialogEditArtist from "./components/dialogEditArtist";
import AlertDialogDeleteArtist from "./components/alertDialogDeleteArtist";

export default function ArtistsFeature() {
    const [artists, setArtists] = useState<TypeArtistAll[]>([]);

    const getArtistsData = () => {
        getArtist().then((res) => {
            console.log(res);
            setArtists(res.responseObject);
        });
    };

    useEffect(() => {
        getArtistsData();
    }, []);

    return (
        <div className="container w-full pt-2">
            <Card variant="surface" className="w-600 m-auto">
                <Flex className="w-full" direction="row" gap="2">
                    <Text as="div" size="2" weight="bold">Artists</Text>
                    <DialogAddArtist getArtistsData={getArtistsData} />
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Artist Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {artists && artists.map((artist: TypeArtistAll) => (
                            <Table.Row key={artist.artist_Id}>
                                <Table.RowHeaderCell>{artist.artist_Id}</Table.RowHeaderCell>
                                <Table.Cell>{artist.artist_name}</Table.Cell>
                                <Table.Cell>
                                    <DialogEditArtist 
                                        getArtistsData={getArtistsData}
                                        artist_Id={artist.artist_Id}
                                        artist_name={artist.artist_name}
                                        description={artist.description}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <AlertDialogDeleteArtist 
                                        getArtistsData={getArtistsData}
                                        artist_Id={artist.artist_Id}
                                        artist_name={artist.artist_name}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </div>
    );
}
