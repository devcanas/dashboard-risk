<script>
    import Layout from '@Components/Layout';
    import Header from '@Components/Header';
    import Map from '@Components/Map';
    import Footer from "@Components/Footer";
    import { onMount } from "svelte";
    import { availableDates, sahInfo } from '../stores';

    onMount(_ => {
        fetch("http://covid.vps.tecnico.ulisboa.pt/dates.php")
        .then(res => res.json())
        .then(data => {
            availableDates.setState(data);
            return data[data.length - 1]
        }).then(defaultDate => {
            availableDates.selectDate(defaultDate)
        }).catch(err => {
            console.log("There was a problem fetching the available risk maps, make sure every file is properly formatted. ", err)
        })
    })

    availableDates.subscribe(newData => {
        
        const endpoint = `http://covid.vps.tecnico.ulisboa.pt/sah.php?date=${newData.selectedDate}`;
        
        newData.selectedDate && fetch(endpoint)
        .then(res => res.json())
        .then(sah => {
            console.log("got new data")
            sahInfo.setState(sah)
        })
        .catch(err => console.log(`There was a problem getting the mobility data for the date: ${newData.selectedDate}.\n`, err))
    })

</script>

<style src="./style.scss">

</style>

<Layout>
    <div class="container">
        <Header />
        <div class="container__map">
            <Map sahInfo={$sahInfo} selectDate={$availableDates.selectedDate}/>
        </div>
        <Footer />
    </div>
</Layout>
