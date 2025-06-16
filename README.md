# 🕷️ Xcrap Factory: Instantiate clients, parsing models, and extractors from configuration objects

Xcrap Factory is a set of utilities for dynamically creating instances of clients, extractors, and parsing models, making it easier to configure and extend scraping and parsing pipelines.

## 📦 Installation

Installation is straightforward—just use your favorite dependency manager. Here’s an example using NPM:

```cmd
npm i @xcrap/factory
```

## 🛠️ Features

* **createClient**: Instantiates clients from a registry of allowed classes.
* **createExtractor**: Creates extractor functions from configurable text and a registry of allowed extractors.
* **createParsingModel**: Builds validated and nested parsing models with customizable extractors and types.

## 🚀 Usage

### 1. Creating a Client

```typescript
import { GotScrapingClient } from "@xcrap/got-scraping-client"
import { AxiosClient } from "@xcrap/axios-client"
import { createClient } from "@xcrap/factory"

const config = {
	allowedClients: {
		"got-scraping": GotScrapingClient,
		"axios": AxiosClient 
	}
}

const client = createClient({
	config: config,
	type: "...", // Client type
	options: {...} // Client constructor options
})
```

### 2. Creating an Extractor

```typescript
import { extractInnerText, extractSrc, extractHref, extractAttribute } from "@xcrap/parser"
import { createExtractor } from "@xcrap/factory"

const config = {
	allowedExtractors: {
		innerText: extractInnerText,
		src: extractSrc,
		href: extractHref,
		attribute: extractAttribute // extractAttribute(name: string) -> Generates an extractor
	},
	argumentSeparator: ":" // Optional | Usage example -> "attribute:value"
}

const extractor = createExtractor({
	extractorText: "..", // innerText, src, href, attribute:ATTRIBUTE_NAME...
	config: config
})
```

### 3. Creating a Parsing Model

```typescript
import { HtmlParsingModel, JsonParsingModel } from "@xcrap/parser"
import { createParsingModel } from "@xcrap/factory"

const config = {
	allowedExtractors: {...},
	extractorArgumentSeparator: "...", // Optional
	allowedModels: {
		html: HtmlParsingModel,
		json: JsonParsingModel
	}
}

const parsingModel = createParsingModel({
	config: config,
	model: {
		type: "html", // Model type: html, json..
		model: {
			title: {
				query: "title",
				extractor: "innerText",
			},
			bodyData: { // Nested model
				query: "body",
				nested: {
					type: "html",
					model: {
						heading: {
							query: "h1",
							extractor: "innerText"
						}
					}
				}
			}
		}
	}
})
```

## 🧪 Testing

Automated tests are located in `__tests__`. To run them:

```bash
npm run test
```

## 🤝 Contributing

* Want to contribute? Follow these steps:
* Fork the repository.
* Create a new branch (git checkout -b feature-new).
* Commit your changes (git commit -m 'Add new feature').
* Push to the branch (git push origin feature-new).
* Open a Pull Request.

## 📝 License

This project is licensed under the MIT License.