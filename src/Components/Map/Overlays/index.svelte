<script>
    import ColorScale from "./ColorScale";
    import Info from "./Info";
    import { mapMode } from "../../../stores";
</script>

<Info />
<ColorScale 
    risk={$mapMode.isRiskMap} 
    idq={$mapMode.isIDQMap}
    sah={$mapMode.isSAHMap} />