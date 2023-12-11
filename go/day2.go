package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func ReadFile(fileName string) chan string {
	c := make(chan string)

	go func() {
		file, err := os.Open(fileName)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		// optionally, resize scanner's capacity for lines over 64K, see next example
		for scanner.Scan() {
			c <- scanner.Text()
		}

		close(c)
	}()

	return c
}

type Result struct {
	Red   int
	Green int
	Blue  int
}

type Game struct {
	Id      int
	Results []Result
}

func parseGame(line string) Game {
	r, _ := regexp.Compile("(\\d+) (\\w+)")

	nameAndResults := strings.Split(line, ":")

	gameId, err := strconv.Atoi(strings.Split(nameAndResults[0], " ")[1])
	if err != nil {
		log.Fatal(err)
	}

	individualGames := strings.Split(nameAndResults[1], ";")
	var results []Result
	for _, individualGame := range individualGames {
		result := Result{
			Red:   0,
			Green: 0,
			Blue:  0,
		}

		matches := r.FindAllStringSubmatch(individualGame, -1)
		for _, match := range matches {
			num, err := strconv.Atoi(match[1])
			if err != nil {
				log.Fatal(err)
			}

			switch match[2] {
			case "red":
				result.Red = num
			case "green":
				result.Green = num
			case "blue":
				result.Blue = num
			}
		}

		results = append(results, result)
	}

	game := Game{
		Id:      gameId,
		Results: results,
	}

	return game
}

func stepOne(games []Game) int {
	isPossible := func(results []Result) bool {
		for _, result := range results {
			if result.Red > 12 || result.Green > 13 || result.Blue > 14 {
				return false
			}
		}

		return true
	}

	answer := 0

	for _, game := range games {
		if isPossible(game.Results) {
			answer += game.Id
		}
	}

	return answer
}

func stepTwo(games []Game) int {
	answer := 0

	for _, game := range games {
		maxRed := 0
		maxGreen := 0
		maxBlue := 0

		for _, result := range game.Results {
			maxRed = max(maxRed, result.Red)
			maxGreen = max(maxGreen, result.Green)
			maxBlue = max(maxBlue, result.Blue)
		}

		answer += maxRed * maxGreen * maxBlue
	}

	return answer
}

func main() {
	filename := "day2.input.txt"
	lineCh := ReadFile(filename)

	var games []Game

	for line := range lineCh {
		games = append(games, parseGame(line))
	}

	stepOneAnswer := stepOne(games)
	fmt.Println(fmt.Sprintf("Step One: %d", stepOneAnswer))

	stepTwoAnswer := stepTwo(games)
	fmt.Println(fmt.Sprintf("Step Two: %d", stepTwoAnswer))
}
