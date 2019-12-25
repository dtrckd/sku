module Main exposing (..)

import Browser
import Html exposing (Html, a, div, iframe, p, pre, text)
import Html.Attributes exposing (..)
import Html.Parser
import Http
import List.Extra
import Markdown
import Markdown.Config exposing (HtmlOption(..), Options, defaultOptions)
import Random



-- MODEL


type Model
    = Failure
    | Loading
    | Success String



-- UPDATE


type Msg
    = GotText (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotText result ->
            case result of
                Ok fullText ->
                    ( Success fullText, Cmd.none )

                Err _ ->
                    ( Failure, Cmd.none )



-- VIEW
--type Msg
--    = GetRandomInt
--    | GotRandomInt Int
--
--
--generateIntCmd : Cmd Msg
--generateIntCmd =
--    Random.generate GotRandomInt (Random.int 0 100)
--
--
--update msg model =
--    case msg of
--        GetRandomInt ->
--            ( model, generateIntCmd )
--
--        GotRandomInt randInt ->
--            randInt


lastOrEmpty : List String -> String
lastOrEmpty alist =
    case List.Extra.last alist of
        Nothing ->
            "-"

        Just v ->
            v


addSpan : String -> String
addSpan text =
    --text ++ "<strong>frr</strong>"
    text
        |> String.replace "\n" " [_BR_] "
        |> String.words
        |> List.foldl
            (\x y ->
                if
                    String.length x
                        > 1
                        && not (String.contains (String.left 1 x) "#-+*_.,;()|{}[]:")
                    --&& not (String.contains (String.left 1 <| lastOrEmpty y) "#-+*_.,;()|{}[]:")
                then
                    y ++ [ "<div class=\"_flip\">" ++ x ++ "</div>" ]

                else
                    y ++ [ x ]
            )
            []
        |> String.join " "
        |> String.replace "[_BR_]" "\n"


customOptionsMD : Options
customOptionsMD =
    { defaultOptions | rawHtml = ParseUnsafe }


view : Model -> Html Msg
view model =
    case model of
        Failure ->
            text "I was unable to load your book."

        Loading ->
            text "SkuuuuuSkuuuuuuu"

        Success fullText ->
            --pre [] [ text fullText ]
            div []
                [ --Markdown.toHtml (Just customOptionsMD) fullText
                  div [] <|
                    --(addSpan fullText |> Markdown.toHtml (Just customOptionsMD))
                    Markdown.toHtml (Just customOptionsMD) fullText
                ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading
    , Http.get
        --{ url = "https://elm-lang.org/assets/public-opinion.txt"
        { url = "sku/sku"
        , expect = Http.expectString GotText
        }
    )


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
