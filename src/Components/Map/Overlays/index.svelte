<script>
    import ColorScale from "./ColorScale";
    import Info from "./Info";
    import { isRiskMap } from "../../../stores";
</script>

<ColorScale risk={$isRiskMap} idq={!$isRiskMap} />
<Info />