"use client";
import { useState, useEffect } from "react";

export default function LocationCheckBox({
    location,
    selectedLocations,
    setSelectedLocations,
    listingData,
    setListingData,
}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const isSelected = selectedLocations.some((loc) => loc.id === location?.id);
        setChecked(isSelected);
        console.log("SELECTED: ", selectedLocations);
    }, [selectedLocations, location?.id]);

    useEffect(() => {
        if (listingData?.nearby && listingData.nearby !== "") {
            let splitIds = [];

            if (typeof listingData.nearby === "string") {
                splitIds = listingData.nearby.split(",").map((id) => Number(id.trim()));
            } else if (Array.isArray(listingData.nearby)) {
                splitIds = listingData.nearby.map((id) => Number(id));
            }

            console.log("split ids:", splitIds);
            if (splitIds.includes(Number(location?.id))) {
                setChecked(true);
                if (!selectedLocations.includes(location.id)) {
                    setSelectedLocations((prev) => [...prev, Number(location.id)]);
                }
            }
        }
    }, [listingData?.nearby, location?.id, selectedLocations, setSelectedLocations]);

    const handleClick = (e) => {
        const locationId = Number(e.target.value);
        const isChecked = e.target.checked;
        setChecked(isChecked);

        setSelectedLocations((prevLocations) => {
            let updatedLocations;

            if (!isChecked) {
                updatedLocations = prevLocations.filter((id) => id !== locationId);
            } else {
                updatedLocations = [...prevLocations, locationId];
            }

            setListingData({
                ...listingData,
                nearby: updatedLocations.join(","),
            });

            console.log("updated locations:", updatedLocations);
            return updatedLocations;
        });
    };

    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                value={location?.id}
                checked={checked}
                onChange={handleClick}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span>{location?.name || "Unknown Location"}</span>
        </label>
    );
}