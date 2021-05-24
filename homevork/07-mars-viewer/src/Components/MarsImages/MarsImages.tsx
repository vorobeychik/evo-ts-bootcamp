import React, {useMemo} from "react";
import {MarsImage} from "./MarsImage/MarsImage";
import {useSelector} from "react-redux";
import {selectMarsImages, selectStatus,selectFavouritesMarsImages} from "../../redux/marsImagesSlice";
import {MarsImagesStatus} from "../MarsImagesStatus/MarsImagesStatus";
import {selectSol} from "../../redux/marsImagesSlice";
import {RootState} from "../../redux/store";
import {Status} from "../../redux/marsImagesSlice";
import styles from './MarsImages.module.css'
import {selectMenuTab} from "../../redux/menuTabSlice";
import {MenuTab} from "../../redux/menuTabSlice";
import {PageHeader} from "antd";


export function MarsImages(){
    const status = useSelector(selectStatus)
    const selectedSol = useSelector(selectSol)
    const tabSelected = useSelector(selectMenuTab)
    const imagesData =  useSelector((state:RootState) => selectMarsImages(state,selectedSol)) ?? []
    const favouritesImageData = useSelector(selectFavouritesMarsImages)


    const images = useMemo(() => {
        const data = tabSelected === MenuTab.Photos ? imagesData : favouritesImageData
        return data.map((imageData) => {
            return <MarsImage image={imageData} key={imageData.id} />
        })
    },[imagesData,favouritesImageData,tabSelected])

    return (
        <PageHeader>
            <div className={styles.marsImages}>
                <MarsImagesStatus status={status} />
                <div className={styles.imagesContainer}>
                    {status === Status.Loaded  && images}
                </div>
            </div>
        </PageHeader>
    )
}