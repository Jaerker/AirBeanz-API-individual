## GET - /api/about

* [#### GET    `/api/about/`                              - Get about page information](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/aboutDocumentation.md#get---apiabout)

Specifik information om företaget/kaffet

### Returns
```
    success: true,
    message: 'Found text',
    status: 200,
    data: textInfo
```

### Errors
``` 
	"success": false,
	"message": "Bad credentials: No info found for about page.",
	"status": 400
	
```


